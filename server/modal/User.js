const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todoList: [todoSchema]
})


const User = mongoose.model('User', userSchema)
module.exports = User