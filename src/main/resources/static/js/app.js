'use strict';

/* Elements */
const usernamePage = document.getElementById('username-page');
const chatPage     = document.getElementById('chat-page');
const usernameForm = document.getElementById('usernameForm');
const messageForm  = document.getElementById('messageForm');
const messageInput = document.getElementById('message');
const messageArea  = document.getElementById('messageArea');
const connectingEl = document.querySelector('.connecting');


let stompClient = null;
let username = null;

const avatarColors = [
    '#7C4DFF','#00E5FF','#66DA73','#FF5BD6',
    '#FFC107','#FF8A65','#4DD0E1','#8BC34A'
];

/* Connect */
function connect(event){
    event.preventDefault();
    const value = messageForm ? document.getElementById('name').value.trim() : "";
    if(!value) return;
    username = value;

    usernamePage.classList.add('hidden');
    usernamePage.setAttribute('aria-hidden','true');
    chatPage.classList.remove('hidden');
    chatPage.setAttribute('aria-hidden','false');

    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

/* Connected */
function onConnected(){
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send(
        "/app/chat/addUser",
        {},
        JSON.stringify({ sender: username, type:'JOIN' })
    );

    connectingEl.classList.add('hidden');
    setTimeout(()=>messageInput.focus(),100);
}

/* Error */
function onError(){
    connectingEl.textContent = 'Could not connect. Refresh to retry.';
    connectingEl.style.color = '#ff5bd6';
}

/* Send message */
function sendMessage(event){
    event.preventDefault();

    const content = messageInput.value.trim();
    if(content && stompClient){
        stompClient.send("/app/chat/sendMessage",{},JSON.stringify({
            sender: username,
            content,
            type: "CHAT"
        }));
        messageInput.value = "";
    }
}

/* Typing event: send on input */
messageInput.addEventListener('input', ()=>{
    if(stompClient && username){
        stompClient.send("/app/chat/sendMessage",{},JSON.stringify({
            sender: username,
            type: "TYPING"
        }));
    }
});

/* Handle incoming messages */
function onMessageReceived(payload){
    const message = JSON.parse(payload.body);

    const li = document.createElement('li');
    li.classList.add('msg');

    /* JOIN/LEAVE */
    if(message.type === 'JOIN' || message.type === 'LEAVE'){
        li.classList.add('msg--other');
        li.innerHTML = `<em>${message.sender} ${message.type === 'JOIN' ? 'joined' : 'left'}</em>`;
    } else {
        const mine = message.sender === username;
        li.classList.add(mine ? 'msg--me' : 'msg--other');

        const meta = document.createElement('div');
        meta.className = 'msg__meta';

        if(!mine){
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = message.sender[0].toUpperCase();
            avatar.style.backgroundColor = getAvatarColor(message.sender);
            meta.appendChild(avatar);
        }

        const name = document.createElement('span');
        name.textContent = message.sender;
        meta.appendChild(name);

        const text = document.createElement('p');
        text.className = 'msg__text';
        text.textContent = message.content;

        li.appendChild(meta);
        li.appendChild(text);
    }

    messageArea.appendChild(li);
    li.scrollIntoView({ behavior:'smooth', block:'end' });
}

/* Avatar color */
function getAvatarColor(name){
    let hash = 0;
    for(let i=0;i<name.length;i++)
        hash = (hash*31 + name.charCodeAt(i))|0;

    return avatarColors[Math.abs(hash)%avatarColors.length];
}

/* Event listeners */
usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
