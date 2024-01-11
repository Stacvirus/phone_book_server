// desabling cors policy by accepting all sources
const cors = require("cors")
 
const express = require("express")
const app = express()
let persons = [
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
app.use(cors())

app.get("/", (req, res) =>{
    res.send("<h1>hello world!</h1>")
})

app.get("/api/persons", (req, res) =>{
    res.json(persons)
})

// access a specific element
app.get("/api/persons/:id", (req, res) =>{
    const id = req.params.id
    const person = persons.find(per => per.id == id)
    person && res.json(person)
    !person && res.status(404).end()
})

//delete a specefic element
app.delete("/api/persons/:id", (req, res) =>{
    const id = req.params.id
    const person = persons.find(per => per.id == id)
    persons = persons.filter(per => per.id != id)
    res.status(204).end()
})

//posting data to the server
function genetateId(){
    const maxId = persons.length > 0 ? Math.max(...persons.map(per => per.id)) : 0
    return maxId + 1
}
app.use(express.json())
app.post("/api/persons", (req, res) =>{
    const input = req.body
    if(!input.name || !input.number){
        return res.status(204).json({error: "conent is missing"})
    }
    if(persons.map(per => per.name).includes(input.name)){
        return res.status(204).json.apply({error: "person already exit"})
    }
    const person = {
        id: genetateId(),
        name: input.name,
        number: input.number
    }
    persons = persons.concat(person)
    res.json(input)
})

const unknownEndpoint = (req, res) =>{
    res.status(404).send({error: "unknwon endpoint"})
}
app.use(unknownEndpoint)

const port = process.env.PORT || 3001
app.listen(port, () =>{
    console.log("server connected on port: "+ port)
})
