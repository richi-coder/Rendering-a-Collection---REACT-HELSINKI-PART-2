const baseURL = "http://localhost:3000/notes";

const readAll () => {
  fetch(baseURL)
      .then(response => response.json())
}

const create () => {
  fetch(baseURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(noteObject)
    })
    .then(response => response.json())
}