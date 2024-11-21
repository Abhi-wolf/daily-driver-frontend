import { useState, memo } from "react";
import { DayPicker } from "react-day-picker";
import { useGetEvent } from "../../hooks/events/useGetEvents";
import { Button } from "../ui/button";
import AddEventDialog from "../EventDialog";
import { CalendarHeart, CalendarIcon } from "lucide-react";
import { transformDateWithSlash } from "../../lib/utils";
import EditOrDeleteEventDialog from "../Full-calendar/EditOrDeleteEventDialog";
import DataNotFound from "../DataNotFound";

const SideCalender = memo(function SideCalender() {
  const [selected, setSelected] = useState();
  const [isOpen, onClose] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { events } = useGetEvent();

  let eventDays = events?.map((event) => ({
    from: new Date(event.startDate),
    to: new Date(event.endDate),
  }));

  const todaysEvents = events?.filter((event) => {
    const eventDate = new Date(event.startDate);
    const today = new Date();

    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate()
    );
  });

  const handleSelectDate = (date) => {
    setSelected(date);
    onClose(!isOpen);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenEditModal(true);
  };

  return (
    <div className="hidden md:w-[400px] md:flex flex-col items-center gap-10 px-4 py-8 bg-slate-100 h-full">
      <DayPicker
        classNames={{
          chevron: "fill-blue-300",
          range_start: "bg-blue-400",
          range_end: "bg-blue-400",
          range_middle: "bg-blue-300",
          day_button: "border-none",
          today: " bg-orange-400 rounded-full font-semibold",
        }}
        mode="range"
        selected={selected}
        onSelect={handleSelectDate}
        disabled={[{ before: new Date() }]}
        modifiers={{
          booked: eventDays,
        }}
        modifiersClassNames={{
          booked: "bg-green-400 text-white rounded-full",
        }}
      />

      <Button onClick={() => setSelected()} variant="secondary">
        Clear Selected Dates
      </Button>

      {/* <div className="w-full flex flex-col gap-2 overflow-y-auto">
        <h2 className="text-2xl text-orange-500 font-bold">
          Today&apos;s Events
        </h2>
        <ul className=" w-full flex flex-col gap-4 overflow-y-auto p-2">
          {todaysEvents?.map((event) => (
            <li
              key={event._id}
              className="p-2 flex flex-col gap-2 bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => handleOpenModal(event)}
            >
              <h3 className="text-lg font-semibold text-gray-600">
                {event?.eventName}
              </h3>
              <div className="flex gap-4 text-md">
                <div className="flex gap-2 text-gray-500 justify-center items-center">
                  <CalendarHeart className="h-4 w-4" />
                  <span className="italic">
                    {transformDateWithSlash(event?.startDate)}
                  </span>
                </div>
                <div className="flex gap-2  text-gray-500 justify-center items-center">
                  <CalendarHeart className="h-4 w-4" />
                  <span className="italic">
                    {transformDateWithSlash(event?.endDate)}
                  </span>
                </div>
              </div>
            </li>
          ))}

          {todaysEvents?.length === 0 && (
            <DataNotFound size="lg" message="No events found" />
          )}
        </ul>
      </div> */}

      <div className="w-full flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-primary">
          Today&apos;s Events
        </h2>
        {todaysEvents && todaysEvents.length > 0 ? (
          <ul className="w-full flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-2">
            {todaysEvents.map((event) => (
              <li
                key={event._id}
                className="p-4 flex flex-col gap-2 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenModal(event)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {event?.eventName}
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex gap-2 text-gray-600 items-center">
                    <CalendarHeart className="h-4 w-4 text-primary" />
                    <span>
                      Start: {transformDateWithSlash(event?.startDate)}
                    </span>
                  </div>
                  <div className="flex gap-2 text-gray-600 items-center">
                    <CalendarHeart className="h-4 w-4 text-primary" />
                    <span>End: {transformDateWithSlash(event?.endDate)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <DataNotFound
            size="lg"
            message="No events found"
            icon={CalendarIcon}
          />
        )}
      </div>

      <AddEventDialog
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        setSelected={setSelected}
      />

      <EditOrDeleteEventDialog
        isOpen={openEditModal}
        onClose={setOpenEditModal}
        event={selectedEvent}
      />
    </div>
  );
});

export default memo(SideCalender);
