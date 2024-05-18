import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="custom-crateevent"
    >
      <img src={plusImg} alt="create_event" className="custom-createImg" />
      <span className="customText"> Create</span>
    </button>
  );
}
