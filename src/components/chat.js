import React, { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    // Add new message to messages array
    setMessages([
      ...messages,
      {
        username: username,
        text: newMessage,
      },
    ]);

    // Clear input field
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              <strong>{message.username}:</strong> {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <form onSubmit={handleMessageSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="text"
            placeholder="Enter your message"
            value={newMessage}
            onChange={handleMessageChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
