// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url =
//     `mongodb+srv://stacvirus:${password}@phonebookdb.gxpazuz.mongodb.net/`
// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// })

// const Note = mongoose.model('Note', noteSchema)

//phonebook DB
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://parfaitandre5:${password}@phonebookv2.ztyamoo.mongodb.net/phoneBook`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person(
    {
        name: process.argv[3],
        number: process.argv[4],
    }
)

if(process.argv.length > 3){
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

if(process.argv.length == 3){
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(note => {            
            console.log(note.name, note.number)  
        })
        console.log("\n")
        mongoose.connection.close()
    })
}
