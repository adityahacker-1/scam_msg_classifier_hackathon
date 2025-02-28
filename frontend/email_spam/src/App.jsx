import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! Do you have some questions related to security?", sender: "bot" },
  ]);
  const [chatbotInput, setChatbotInput] = useState("");

  const handleSubmitSMS = async () => {
    if (inputText.trim() === "") return;

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        sms: inputText,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting SMS:", error);
    }
  };

  const handleSubmitChatbot = async () => {
    if (chatbotInput.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { text: chatbotInput, sender: "user" }]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        query: chatbotInput,
      });

      setMessages((prevMessages) => [...prevMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setChatbotInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitChatbot();
    }
  };

  return (
    <div className="App">
      <div className="name-tag">ADEA</div>

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
