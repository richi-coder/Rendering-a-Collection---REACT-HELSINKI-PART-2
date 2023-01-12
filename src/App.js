import React from "react";
import "./style.css";
import Note from "./components/Note"
import { useState, useEffect } from 'react'
import Notification from "./components/Message"

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Some error happens")

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then(response => response.json())
      .then(json => {
        setNotes(json)
      })
  }, [])
  
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
      setNotes(notes.concat(json))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3000/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important}
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(changedNote)
    })
    .then(response => response.json())
    .then(json => {
      setNotes(notes.map(n => n.id !== id ? n : json))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      );
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      setNotes(notes.filter(n => n.id !== id))})
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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