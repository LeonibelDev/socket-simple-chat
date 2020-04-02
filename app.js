const express = require('express')
const server = express()
const path = require('path')

server.use(express.static(path.join(__dirname, 'views')))


let port = server.listen(2000, ()=>{
    console.info('server on port 2000')
})


// socket

const socket = require('socket.io')
const io = socket(port)

io.on('connection', (socket)=>{

    socket.on('message', (data)=>{
        io.sockets.emit('output-msg', data)
    })

// user writing
    socket.on('user:typing', (data)=>{
        socket.broadcast.emit('user:typing-output', data)
    })

})
