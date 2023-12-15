const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
let username = '';

// Initialize Firebase with your project config
const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
  projectId: 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
};

firebase.initializeApp(firebaseConfig);

// Reference to the 'messages' node in the database
const messagesRef = firebase.database().ref('messages');

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
        messagesRef.push(formattedMessage);
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

// Listen for new messages from the database
messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});


