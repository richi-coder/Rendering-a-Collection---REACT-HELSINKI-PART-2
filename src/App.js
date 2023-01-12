import React from "react";
import "./style.css";
import Note from "./components/Note"
import { useState, useEffect } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect')
    fetch("http://localhost:3000/notes")
      .then(response => response.json())
      .then(json => {
        console.log('promise fulfilled')
        setNotes(json)
        console.log(json,"aqui")
      })
  }, [])
  
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() < 0.5,
        }

fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(noteObject)
    })
    .then(response => response.json())
    .then(json => {
      console.log(json,"response")
      setNotes(notes.concat(json))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3000/notes/${id}`
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
        <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)} />
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