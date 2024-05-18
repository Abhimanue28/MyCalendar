import React, { useContext } from "react";
import dayjs from "dayjs";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="custom-flex-container">
      <img src={logo} alt="calendar" className="custom-icon-container" />
      <h1 className="custom-style">Calendar</h1>
      <button onClick={handleReset} className="styled-box">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="custom-icons">chevron_left</span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="custom-icons">chevron_right</span>
      </button>
      <h2 className="custom-current-month">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
