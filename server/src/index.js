const express = require('express')
const User = require('./models/user')
// const http = require('http')
// const socketIo = require("socket.io")

//database
require('./db/mongoose')

//routes
const userRouter = require('./routes/userRouter')

//setup
const app = express()

app.use(express.json())
app.use(userRouter)

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('Server with websocket is up on port ' + port) 
})

//websocket
const io = require('socket.io')(server)
app.set('socketio', io)

module.exports = io

const users = {};

const newUser = (socketId) => {
    let user = new User({socketId})
    const names = Object.keys(users).every((element) =>{
        return users[element].name !== user.name
    })
    while(!names){
        user = new User({socketId})
    }
    
    return user
}

io.sockets.on('connection', (socket) => {
    const user = newUser(socket.id)


    socket.broadcast.emit('newUser', user);
    socket.emit('userProfile', user)
    socket.emit('currentUsers', users)
    users[user.socketId] = user

    socket.on('joinRoom', (room) => {
        socket.join(room);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room)
    })

    socket.on('disconnect', () =>{
        delete users[socket.id]
        socket.broadcast.emit('userDisconnect', socket.id)
    })

})