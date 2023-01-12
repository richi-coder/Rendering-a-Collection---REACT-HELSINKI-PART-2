const baseURL = "http://localhost:3000/notes";

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

const deleting = async (id, newObject) => {
  return fetch()
}

export default {
  readAll,
  create,
  update
}