// imports will always go at the top
import ChatMsg from './components/ChatMessage.js';
//import multiavatar from '@multiavatar/multiavatar';


// import user from './components/login.js';


var Typing= document.getElementById("is-typing");
var Joined= document.getElementById("joined");
var avatar = document.querySelector("#avatarcontainer");
var username = document.querySelector("#Username");
var nicknameEnter = document.querySelector("#usernameEnter");
var avatarbox = document.querySelector("#avatar");
var logo = document.querySelectorAll(".logo");
var total_members= 0;
//var Name = document.getElementById("nickname");
const msgNot = document.getElementById("notification-sound");

const socket = io();

// utility functions for socket
function setUserID({ sID }) {
    // save our unique ID generated by Socket on the server side - this is how we track individual connections to the chat service
    vm.socketID = sID;
    total_members;
    //Joined.innerHTML=total_members;
}

function showNewMessage({ message }) {
    // debugger;
    vm.messages.push(message);
    msgNot.play();
}

function handleUserTyping(user) {
    console.log(user.currentlytyping.name,' is typing something');
    Typing.innerHTML=`${user.currentlytyping.name} is typing something`;

    setTimeout(() => {
        Typing.innerHTML=" ";
    }, "2000");
}


const { createApp } = Vue 

const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        nickname: '',
        user: []
      }
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
                id: this.socketID,
                // updateavatar(name)
            })
            this.message = "";
        },
        updateavatar(){
             if(this.nickname){
                 var svg = multiavatar(this.nickname);
                 avatar.innerHTML = svg;
                 username.innerHTML= this.nickname;
                 avatarbox.style.display = "block";
                 logo.style.width = "315px";
                 //debugger;
              }
             //else {
             //     avatar.innerHTML="";
             // }
         },

        catchTextFocus() {
            // emit a custom typing event and broadcast it to the server
            socket.emit('user_typing', {
                name: this.nickname || 'anonymous'
            })
     },
    },

    components: {
        newmsg: ChatMsg
    }
}).mount('#app')

  socket.addEventListener('connected', setUserID);
  socket.addEventListener('new_message', showNewMessage);
  socket.addEventListener('typing', handleUserTyping);
//   window.addEventListener('DOMContentLoaded', ()=> {
 // Name.addEventListener("click", updateavatar);
 // })
