/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "../ui/button";
import { useFileUpdateContent } from "../../hooks/fileExplorer/useFile";
import { toast } from "sonner";

const TextEditor = ({ note, fileId }) => {
  const [editable, setEditable] = useState(false);
  const [editorState, setEditorState] = useState(
    note || `<h4 className="bg-red-500">welcome to your new note`
  );
  const { updateFileContent, isUpdatingFileContent } = useFileUpdateContent();

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    editable,
    shouldRerenderOnTransaction: false,
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const updateData = () => {
    if (editor == "") return;

    const data = editorState;

    updateFileContent(
      { data, fileId },
      {
        onSuccess: () => {
          toast.success("Successfully updated");
        },
        onError: (err) => {
          toast.error(err?.message || "Something went wrong");
        },
      }
    );
  };

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note);
    }
  }, [note, fileId, editor]);

  return (
    <div className="min-h-screen flex flex-col m-2  ">
      <div
        className={`flex items-center justify-between p-2 ${
          editable && "bg-gray-100 shadow-md"
        }  sticky top-2 z-10`}
      >
        {editor && editable && <TipTapMenuBar editor={editor} />}
        <div className="ml-auto flex gap-4">
          <Button variant="outline" onClick={() => setEditable(!editable)}>
            {editable ? "View Only" : "Edit"}
          </Button>

          <Button
            variant={"outline"}
            onClick={updateData}
            disabled={isUpdatingFileContent}
            className={` ${
              isUpdatingFileContent ? "bg-gray-300" : "bg-green-300"
            }`}
          >
            {isUpdatingFileContent ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="prose prose-lg w-full mt-4 py-2 max-w-none px-4 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-lg">
        <EditorContent
          key={fileId}
          editor={editor}
          className="w-full overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default TextEditor;
