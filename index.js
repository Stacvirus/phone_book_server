const express = require("express")
const app = express()
const cors = require("cors")// desabling cors policy by accepting all sources
require("dotenv").config()//to get all the enviroment vars in .env file

const Person = require("./models/person")

//error handler function
function errorHandler(error, req, res, next){
    console.log(error.message)
    if(error.name == "CastError"){
        return res.status(400).send({error: "malformed id"})
    } else if(error.name == "ValidationError"){
        return res.status(400).json({error: error.message})
    }
    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknwon endpoint" })
}

app.use(express.static("dist"))// rendering the frontend on the server side (new init state)
app.use(express.json())//for posting data with json-parser
app.use(cors())//enable all connecting sources

//infos route
app.get('/api/info', (req, res) =>{
    res.send(`<h2>there are ${Person.length} contacts in the phone book </h2> <br> <p> ${new Date()} </p>`)
})

//persons route
app.get("/api/persons", (req, res) => {
    Person.find({}).then(per =>{
        res.json(per)
    })
    
})

// access a specific element
app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(per =>{
            if(per) res.json(per)
            else res.status(404).end()
        })
        .catch(error => next(error))
})

//delete a specefic element
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(result =>{
            res.status(204).end()
        })
        .catch(error => next(error))
})

//posting data
app.post("/api/persons", (req, res, next) => {
    const input = req.body
    const person = new Person({
        name: input.name,
        number: input.number
    })

    person.save()
        .then(savePer =>{
            res.json(savePer)
        })
        .catch(error => next(error))
})

//updating data info in DB
app.put("/api/persons/:id", (req, res, next) =>{
    const id = req.params.id
    const per = {
        name: req.body.name,
        number: req.body.number,
    }
    Person.findByIdAndUpdate(id, 
        per, 
        {new: true, runValidators: true, context: "query"})
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
    console.log("server connected on port: " + port)
})