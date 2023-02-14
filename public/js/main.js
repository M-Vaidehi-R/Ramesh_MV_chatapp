// imports will always go at the top
import ChatMsg from './components/ChatMessage.js';
var Typing= document.getElementById("is-typing");
var Joined= document.getElementById("joined");
var total_members= 0;
const msgNot = document.getElementById("notification-sound");

const socket = io();

// utility functions for socket
function setUserID({ sID }) {
    // save our unique ID generated by Socket on the server side - this is how we track individual connections to the chat service
    vm.socketID = sID;
    total_members;
    Joined.innerHTML=total_members;
}

function showNewMessage({ message }) {
    // debugger;
    vm.messages.push(message);
    msgNot.play();
}

function handleUserTyping(user) {
    console.log(user.currentlytyping.name,' is typing something');
    Typing.innerHTML=`${user.currentlytyping.name} is typing something`;
}

const { createApp } = Vue 

const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        nickname: ''
      }
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
                id: this.socketID
            })

            this.message = "";
        },

        catchTextFocus() {
            // emit a custom typing event and broadcast it to the server
            socket.emit('user_typing', {
                name: this.nickname || 'anonymous'
            })
        }
     },

    components: {
        newmsg: ChatMsg
    }
  }).mount('#app')

  socket.addEventListener('connected', setUserID);
  socket.addEventListener('new_message', showNewMessage);
  socket.addEventListener('typing', handleUserTyping);
