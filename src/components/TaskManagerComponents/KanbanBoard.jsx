/* eslint-disable react/prop-types */
// import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FireExtinguisher, Plus, Trash } from "lucide-react";
// import { FaFire } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useGetProject } from "../../hooks/project/useGetProject";
import { LargeSpinner } from "../../components/Spinners";
import { useUpdateProjectTasks } from "../../hooks/project/useUpdateProjectTasks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const KanbanBoard = () => {
  const { project, isPending } = useGetProject();

  return (
    <div className=" w-full bg-white text-gray-500 h-full  md:p-4">
      {isPending ? (
        <div className="w-fill min-h-full flex items-center justify-center">
          <LargeSpinner />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-violet-500 p-2 underline decoration-wavy">
            Project :{" "}
            <span className="text-green-400">{project?.projectName}</span>
          </h1>
          <Board projectTasks={project?.projectTasks} />
        </>
      )}
    </div>
  );
};

const Board = ({ projectTasks }) => {
  const [cards, setCards] = useState(projectTasks);

  useEffect(() => {
    setCards(projectTasks);
  }, [projectTasks]);

  return (
    <div className="flex h-full w-full gap-1 p-1 md:p-4 justify-around flex-wrap">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-500"
        cards={cards}
        setCards={setCards}
      />

      <BurnBarrel setCards={setCards} cards={cards} />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);
  const { projectId } = useParams();
  const { updateProjectTasks, isPending } = useUpdateProjectTasks();

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card._id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let projectTasks = [...cards];

      let cardToTransfer = projectTasks.find((c) => c._id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      projectTasks = projectTasks?.filter((c) => c._id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        projectTasks.push(cardToTransfer);
      } else {
        const insertAtIndex = projectTasks.findIndex((el) => el._id === before);
        if (insertAtIndex === undefined) return;

        projectTasks.splice(insertAtIndex, 0, cardToTransfer);
      }

      updateProjectTasks(
        { projectId, projectTasks },
        {
          onSuccess: () => {
            toast.success("Task successfully updated");
          },
        }
      );
      setCards(projectTasks);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators?.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards?.filter((c) => c.column === column);

  return (
    <div className="w-64 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards?.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-disabled={isPending}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards?.map((c) => {
          return <Card key={c._id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} cards={cards} />
      </div>
    </div>
  );
};

const Card = ({ title, _id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={_id} column={column} />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, _id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-300 p-3 active:cursor-grabbing"
      >
        <p className="text-md text-neutral-900">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-300 opacity-0 text-gray-400"
    />
  );
};

const BurnBarrel = ({ setCards, cards }) => {
  const [active, setActive] = useState(false);
  const { projectId } = useParams();
  const { updateProjectTasks, isPending } = useUpdateProjectTasks();

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    const projectTasks = cards?.filter((card) => card._id !== cardId);

    updateProjectTasks(
      { projectId, projectTasks },
      {
        onSuccess: () => {
          toast.success("Task successfully updated");
        },
      }
    );
    setCards(projectTasks);

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      aria-disabled={isPending}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FireExtinguisher className="animate-bounce" /> : <Trash />}
    </div>
  );
};

const AddCard = ({ column, setCards, cards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { projectId } = useParams();
  const { updateProjectTasks, isPending } = useUpdateProjectTasks();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      _id: uuidv4(),
    };

    const projectTasks = [...cards, newCard];

    setCards(projectTasks);

    updateProjectTasks(
      { projectId, projectTasks },
      {
        onSuccess: () => {
          toast.success("Task successfully added");
        },
      }
    );
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <Textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            rows={6}
            disabled={isPending}
            placeholder="Add new task..."
            className="w-full  rounded border border-violet-300 bg-gray-100 p-3 text-sm text-gray-500 placeholder-violet-300 focus:outline-0 font-semibold"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <Button
              size="sm"
              disabled={isPending}
              onClick={() => setAdding(false)}
              //   className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              //   className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus />
            </Button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-500"
        >
          <span>Add task</span>
          <Plus className="h-5 w-5" />
        </motion.button>
      )}
    </>
  );
};
