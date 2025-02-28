import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const handleSubmit = async () => {
    if (inputText.trim() === "") return; // Don't send empty messages

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user" },
    ]);

    // Make an API call to the backend for processing the user's message
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      sms: inputText,
    });

    // Add bot's response to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response.data.prediction, sender: "bot" },
    ]);
    setInputText(""); // Clear the input field
  };

  return (
    <div className="App">
      <h1>SMS Spam Classifier</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your message here"
      />
      <button onClick={handleSubmit}>Predict</button>

      {prediction && <h2>{prediction}</h2>}

      {/* Chatbot */}
      <div className="chatbot">
        <div className="chat-header">Chat with us!</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "bot" ? "message bot" : "message user"}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
          ></textarea>
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
