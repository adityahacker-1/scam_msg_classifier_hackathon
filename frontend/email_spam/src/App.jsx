import React, { useState } from "react";
import axios from "axios";

// frontend
function App() {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      sms: inputText
    });

    setPrediction(response.data.prediction);
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
    </div>
  );
}

export default App;
