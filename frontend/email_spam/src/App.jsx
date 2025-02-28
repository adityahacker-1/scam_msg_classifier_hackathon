import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [inputText, setInputText] = useState(""); // For SMS Spam Classifier input
  const [prediction, setPrediction] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! Do you have some questions related to security?", sender: "bot" },
  ]);
  const [chatbotInput, setChatbotInput] = useState(""); // For Chatbot input

  // Handle SMS Spam Classifier submission
  const handleSubmitSMS = async () => {
    if (inputText.trim() === "") return; // Don't send empty messages

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        sms: inputText,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting SMS:", error);
    }
  };

  // Handle Chatbot message submission
  const handleSubmitChatbot = async () => {
    if (chatbotInput.trim() === "") return; // Don't send empty messages

    setMessages((prevMessages) => [...prevMessages, { text: chatbotInput, sender: "user" }]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        query: chatbotInput,
      });

      setMessages((prevMessages) => [...prevMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setChatbotInput(""); // Clear input
  };

  // Handle Enter key press to trigger button click
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent line break
      handleSubmitChatbot();
    }
  };

  return (
    <div className="App">
      {/* 🔹 Small Name on the Top Left Corner */}
      <div className="name-tag">ADEA</div>

      {/* SMS Spam Classifier */}
      <div className="sms-section">
        <h2>SMS Spam Classifier</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your message here"
        />
        <button onClick={handleSubmitSMS}>Predict</button>

        {prediction && <h3>{prediction}</h3>}
      </div>

      {/* Chatbot */}
      <div className="chatbot">
        <div className="chat-header">Ask Us Questions on Cybersecurity</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "bot" ? "message bot" : "message user"}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            value={chatbotInput}
            onChange={(e) => setChatbotInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          ></textarea>
          <button onClick={handleSubmitChatbot}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
