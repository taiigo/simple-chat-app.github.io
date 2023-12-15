const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
let username = '';

const pusher = new Pusher('YOUR_PUSHER_APP_KEY', {
    cluster: 'YOUR_PUSHER_CLUSTER',
    encrypted: true
});

const channel = pusher.subscribe('chat_channel');

channel.bind('message', function(data) {
    displayMessage(data);
});

function setUsername() {
    username = document.getElementById('username-input').value.trim();
    if (username !== '') {
        alert('Username set: ' + username);
    } else {
        alert('Please enter a valid username.');
    }
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '' && username !== '') {
        const formattedMessage = { username, message };
        channel.trigger('message', formattedMessage);
        displayMessage(formattedMessage);

        // Clear the input field after sending the message
        messageInput.value = '';

        // Scroll to the bottom to show the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        alert('Please set a username and enter a message.');
    }
}

function displayMessage(message) {
    const div = document.createElement('div');
    div.textContent = `${message.username}: "${message.message}"`;
    chatBox.appendChild(div);

    // Scroll to the bottom to show the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

