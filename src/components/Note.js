import React from "react";

const Note = ({ note, toggleImportance, deleting }) => {
  const labelToggle = note.important
  ? "make not important" : "make important";
  const labelDelete = "DELETE";
  return (
    <li className="d-flex justify-content-end flex-column note card my-2 w-25 p-3">
      <h2 className>{`Note: ${note._id}`}</h2>
      <p className="card-title text-start h-25 mb-5 p-2">{note.content}</p>
      <button
      className="btn btn-primary"
      onClick={toggleImportance}>
        {labelToggle}
      </button>
      <button
      className="btn btn-danger my-2"
      onClick={deleting}
      >
        {labelDelete}
      </button>
    </li>
  )
}

export default Note