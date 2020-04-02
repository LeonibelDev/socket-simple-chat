const socket = io()

var message = document.querySelectorAll('#user_msg')[0]
var user = document.querySelectorAll('#user_name')[0]
var output = document.querySelectorAll('#output')[0]
var send = document.querySelectorAll('#send')[0]
var action = document.querySelectorAll('.card-footer span')[0]


send.addEventListener('click', function(){
    socket.emit('message', {
        user: user.value,
        message: message.value
    })

    message.value = ""
    user.value = ""
})

socket.on('output-msg', function(data){
    output.innerHTML += `
    <div>
        <span class="badge">${data.user}:<span>
        <span class="lead">${data.message}<span>

    </div>
    `
    action.innerHTML = ``

})

// ejemplo de que escribo

message.addEventListener('keypress', function(){
    socket.emit('user:typing', user.value)
}) 

socket.on('user:typing-output', function(user){
    action.innerHTML = `${user} is typing`
})

