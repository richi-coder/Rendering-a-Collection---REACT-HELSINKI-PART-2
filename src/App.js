import React from "react";
import "./style.css";
import Note from "./components/Note"
import { useState, useEffect } from 'react'
import Notification from "./components/Message"
import noteService from "./services/notes"

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Running OK!")

  useEffect(() => {
    noteService
      .readAll()
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
    noteService
      .create(noteObject)
      .then(json => {
        setNotes(notes.concat(json))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important}
    
  noteService
    .update(id,changedNote)
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

  const deleting = (id) => {
    noteService
    .deleteNote(id)
    .then(json => {
      setNotes(notes.filter(n => n.id !== id))
    })
  } 

  return (
    <div className="container-fluid">
      <h1>My FrontEnd Technologies</h1>
      <form className="d-flex align-items-center justify-content-center mb-3" onSubmit={addNote}>
        <input
        value={newNote}
        onChange={handleNoteChange} />
        <button
        className="btn btn-success ms-3"
        type="submit">SAVE</button>
      </form>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul className="d-flex flex-row p-3 flex-wrap justify-content-around gap-2">
        {notesToShow.map(note =>
        <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
        deleting={() => deleting(note.id)} />
        )}
      </ul>
    </div>
  )
}

export default App