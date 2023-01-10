import React from "react";
import "./style.css";
import Note from "./components/Note"
import { useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() < 0.5,
          id: notes.length + 1,
        }

  setNotes(notes.concat(noteObject))
  setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
        <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange} />
        <button type="submit">SAVE</button>
      </form>
    </div>
  )
}

export default App