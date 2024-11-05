/* eslint-disable react/prop-types */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useGetEvent } from "../../hooks/events/useGetEvents";
import { useEffect } from "react";
import EditOrDeleteEventDialog from "./EditOrDeleteEventDialog";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function CalendarComponent() {
  const { events: data } = useGetEvent();

  const [events, setEvents] = useState();
  const [isOpen, onClose] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    onClose(true);
  };

  useEffect(() => {
    if (data) {
      const mappedEvents = data.map((event) => ({
        start: new Date(event.startDate), // Ensure proper date conversion
        end: new Date(event.endDate), // Assuming event ends on the same day
        title: event.eventName,
        id: event._id, // Use a unique identifier
        description: event.eventDescription,
      }));
      setEvents(mappedEvents);
    }
  }, [data]);

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((prevEvents) =>
      prevEvents.map((event, index) => {
        // Assuming you are resizing the first event for now, you can change this as needed
        if (index === 0) {
          return { ...event, start, end };
        }
        return event;
      })
    );
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) =>
      prevEvents.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev))
    );
    console.log("Event dropped", data);
  };

  return (
    <div className="text-center min-h-full">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "91vh" }}
        components={{
          event: ({ event }) => (
            <div
              onClick={() => handleOpenModal(event)}
              className="cursor-pointer"
            >
              {event.title}
            </div>
          ),
        }}
      />

      <EditOrDeleteEventDialog
        isOpen={isOpen}
        onClose={onClose}
        event={selectedEvent}
      />
    </div>
  );
}
