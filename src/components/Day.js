import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "custom-day"
      : "";
  }
  return (
    <div className="custom-container">
      <header className="custom-flex">
        {rowIdx === 0 && (
          <p className="text-sm-mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`custom-text-two  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="custom-flex-point"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            // onClick={() => setSelectedEvent(evt)}
            style={{
              backgroundColor: `var(--bg-${evt.label}-200)`,
              padding: "0.15rem",
              marginRight: "0.75rem",
              color: "#4a5568",
              fontSize: "0.9rem",
              borderRadius: "0.375rem",
              marginBottom: "0.25rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
