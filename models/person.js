const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log("connected to", url)

mongoose.connect(url)
    .then(result =>{
        console.log("connected to MongoDB")
    })
    .catch((error) =>{
        console.log("error connecting to MongoDB:", error.message)
    })

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 5,
            required: true
        },
        number: {
            type: String,
            validate: {
                validator: (v) =>{
                    return /\d{2,3}-\d{7,}/.test(v)
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, "User phone number required"]
        },
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) =>{
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

    module.exports = mongoose.model("Person", personSchema)