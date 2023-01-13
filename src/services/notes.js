const baseURL = "https://crudcrud.com/api/9dfc780cf1254a4d92d8d97595fb65e2/notes";

const readAll = async () => {
  return fetch(baseURL)
      .then(response => response.json())
}

const create = async (newObject) => {
  return fetch(baseURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    })
    .then(response => response.json())
}

const update = async (id, newObject) => {
  return fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newObject)
  })
  .then(response => response.json())
}

const deleteNote = async (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE"
  })
  .then(response => response.json())
}

export default {
  readAll,
  create,
  update,
  deleteNote
}