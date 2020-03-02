const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adjective = ['Salty', 'Slippery', 'Awkward', 'Quirky', 'Dreamy', 'Childish', 'Sparkly', 'Savage', 'Vengeful', 'Respected']
const noun = ['Garlic', 'Pickle', 'Peanut Butter', 'Sandwhich', 'Pancake', 'Soup', 'Sofa', 'Handshake', 'Grapefruit', 'House Party']

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default:()=>{
            return `${adjective[Math.floor(Math.random()*adjective.length)]} ${noun[Math.floor(Math.random()*noun.length)]}`
        }
    },
    socketId: {
        type: String,
        required: true
        }
    
},
{
 timestamps: true    
})


const User = mongoose.model('User', userSchema)

module.exports = User