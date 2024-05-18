import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen-w-full-fixed">
      <form className="bg-white-rounded-lg-shadow-2xl-w">
        <header className="custom-EventModal-third">
          <span className="custom-material-icon">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="custom-material-icon cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="custom-material-icon">close</span>
            </button>
          </div>
        </header>
        <div className="custom-padding-eventMo">
          <div className="custom-grid-eventMo">
            <div></div>
            <div className="custom-input-container">
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="custom-event-title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="custom-schedule">
                <span className="material-icons-custom">schedule</span>
                <p>{daySelected.format("dddd, MMMM DD")}</p>
              </div>
            </div>
          </div>
        </div>

        <span className="custom-material-icon">segment</span>
        <input
          type="text"
          name="description"
          placeholder="Add a description"
          value={description}
          required
          className="custom-input-desc"
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="custom-material-icon">bookmark_border</span>
        <div className="custom-flex-gap">
          {labelsClasses.map((lblClass, i) => (
            <span
              key={i}
              onClick={() => setSelectedLabel(lblClass)}
              className="custom-label"
              style={{ backgroundColor: `var(--bg-${lblClass}-500)` }}
            >
              {selectedLabel === lblClass && (
                <span className="custom-material-icon-box">check</span>
              )}
            </span>
          ))}
        </div>

        <footer className="custom-save">
          <button
            type="submit"
            onClick={handleSubmit}
            className="custom-button"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
