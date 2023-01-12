import React from "react";

const Note = ({ note, toggleImportance, deleteNote }) => {
  const labelToggle = note.important
  ? "make not important" : "make important";
  const labelDelete = "DELETE";
  return (
    <li className="note list-item">
      {note.content}
      <button
      className="btn btn-primary"
      onClick={toggleImportance}>
        {labelToggle}
      </button>
      <button
      className="btn btn-danger"
      onClick={deleteNote}
      >
        {labelDelete}
      </button>
    </li>
  )
}

export default Note