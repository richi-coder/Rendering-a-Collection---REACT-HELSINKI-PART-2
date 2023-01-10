import React from "react";
import "./style.css";
import Note from "./components/Note"
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {props.notes.map(note =>
        <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}/>
        <button type="submit">SAVE</button>
      </form>
    </div>
  )
}

export default App