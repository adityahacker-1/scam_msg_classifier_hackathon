import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [inputText, setInputText] = useState(""); // For SMS Spam Classifier input
  const [prediction, setPrediction] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [chatbotInput, setChatbotInput] = useState(""); // For Chatbot input

  // Handle SMS Spam Classifier submission
  const handleSubmitSMS = async () => {
    if (inputText.trim() === "") return; // Don't send empty messages

    // Send the SMS text for classification
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      sms: inputText,
    });
    setPrediction(response.data.prediction);
  };

  // Handle Chatbot message submission
  const handleSubmitChatbot = async () => {
    if (chatbotInput.trim() === "") return; // Don't send empty messages

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: chatbotInput, sender: "user" },
    ]);

    // Make an API call to the backend for chatbot response
    const response = await axios.post("http://127.0.0.1:5000/chat", {
      query: chatbotInput,
    });

    // Add bot's response to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response.data.response, sender: "bot" },
    ]);
    setChatbotInput(""); // Clear the chatbot input field
  };

  return (
    <div className="App">
      {/* SMS Spam Classifier */}
      <div className="sms-section">
        <h1>SMS Spam Classifier</h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your message here"
        />
        <button onClick={handleSubmitSMS}>Predict</button>

        {prediction && <h2>{prediction}</h2>}
      </div>

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
            value={chatbotInput}
            onChange={(e) => setChatbotInput(e.target.value)}
            placeholder="Type your message..."
          ></textarea>
          <button onClick={handleSubmitChatbot}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
