const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const div = document.createElement('div');
        div.textContent = message;
        chatBox.appendChild(div);

        // Clear the input field after sending the message
        messageInput.value = '';

        // Scroll to the bottom to show the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
