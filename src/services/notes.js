const baseURL = "http://localhost:3000/notes";

const readAll = () => {
  fetch(baseURL)
      .then(response => response.json())
}

const create = (newObject) => {
  fetch(baseURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    })
    .then(response => response.json())
}

const update = (id, newObject) => {
  fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newObject)
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