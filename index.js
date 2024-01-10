const express = require("express")
const app = express()
let notes = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get("/", (req, res) =>{
    res.send("<h1>hello world!</h1>")
})

app.get("/api/notes", (req, res) =>{
    res.json(notes)
})

const port = 3001
app.listen(port)
console.log("server connected on port: "+ port)