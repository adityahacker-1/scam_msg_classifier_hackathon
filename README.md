# ADEA: AI-Powered SMS Spam Classifier & Cybersecurity Chatbot

## Overview
ADEA is an AI-powered web application that serves two primary functions:
1. **SMS Spam Detection:** Uses a trained AI model to classify messages as "Spam" or "Not Spam" with high accuracy.
2. **Cybersecurity Chatbot:** Integrates OpenAI's API to provide cybersecurity-related answers to users in a conversational chatbot format.

This project combines **Python (Flask, Scikit-Learn, NLTK)** for machine learning, **React (Vite)** for frontend development, and **OpenAI API** for chatbot functionality.

---
## Features
- **AI-based Spam Detection:** Trained on SMS datasets to accurately classify spam messages.
- **Interactive Chatbot:** Uses OpenAI's API to answer cybersecurity-related queries.
- **Full-Stack Integration:** Flask backend with a Vite-powered React frontend.
- **Secure API Handling:** OpenAI API key is not exposed in the repository.
- **Responsive UI:** A simple and intuitive interface for users.

---
## Tech Stack
### Backend:
- Python 3.10.11
- Flask (REST API)
- Scikit-Learn (Machine Learning)
- NLTK (Natural Language Processing)
- Pickle (Model Serialization)

### Frontend:
- React (Vite @latest)
- Axios (API Requests)
- CSS (Styling)

---
## Installation & Setup
### Prerequisites
- Python (>=3.10)
- Node.js & npm
- Virtual Environment (Recommended)
- Conda (Optional for package management)

### Backend Setup (Flask)
1. Clone the repository:
   ```sh
   git clone "https://github.com/adityahacker-1/scam_msg_classifier_hackathon.git"
   cd ai
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv scam
   python3 -m venv scam
   source scam/bin/activate  # For macOS/Linux
   scam\Scripts\activate  # For Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Download NLTK stopwords:
   ```sh
   python -c "import nltk; nltk.download('stopwords')"
   ```
5. Train the spam detection model (Optional, if not using pre-trained model):
   ```sh
   python train_model.py
   ```
6. Run the Flask app:
   ```sh
   python app.py
   ```

### Frontend Setup (React Vite)
1. Navigate to the frontend directory:
   ```sh
   cd frontend/email_spam
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the React app:
   ```sh
   npm run dev
   ```

---
## Usage
1. Open the React frontend (`http://localhost:5173` by default).
2. **Spam Classifier:** Enter an SMS and click "Predict" to classify it as spam or not spam.
3. **Chatbot:** Ask cybersecurity-related questions and get AI-generated responses.

---
## Project Workflow
### 1. Data Preprocessing & Model Training
- Loaded **spam.csv** dataset in Pandas.
- Cleaned text by:
  - Lowercasing
  - Removing stopwords & punctuation
  - Applying stemming (NLTK PorterStemmer)
- Vectorized text using **TF-IDF Vectorizer**.
- Trained multiple models (**Naïve Bayes - MultinomialNB performed best**).
- Saved the trained model using **Pickle**.

### 2. Backend (Flask API)
- Created REST API endpoints:
  - `/predict`: Takes an SMS as input and returns classification (`Spam` or `Not Spam`).
  - `/chat`: Handles chatbot queries using OpenAI API.
- Integrated **CORS** for frontend-backend communication.

### 3. Frontend (React Vite)
- Designed a clean UI with two sections:
  - **SMS Spam Classifier:** Takes user input and displays the prediction.
  - **Cybersecurity Chatbot:** Chat interface for OpenAI-powered responses.
- Connected frontend to Flask API via **Axios**.

---
## API Endpoints
### `POST /predict`
- **Description:** Predicts whether an SMS is spam or not.
- **Request Body:**
  ```json
  {
    "sms": "Congratulations! You've won a free gift. Click here to claim."
  }
  ```
- **Response:**
  ```json
  {
    "prediction": "Spam"
  }
  ```

### `POST /chat`
- **Description:** Chatbot that answers cybersecurity questions.
- **Request Body:**
  ```json
  {
    "query": "How can I protect my online accounts?"
  }
  ```
- **Response:**
  ```json
  {
    "response": "Use strong passwords, enable 2FA, and avoid clicking on suspicious links."
  }
  ```

---
## Future Improvements
- Improve chatbot responses with a cybersecurity-specific dataset.
- Expand spam detection to include email classification.
- Deploy backend on a cloud server (e.g., AWS, GCP, or Heroku).
- Enhance UI with Material UI or Tailwind CSS.

---
## Acknowledgments
- **NLTK** for Natural Language Processing
- **Scikit-Learn** for ML model training
- **OpenAI API** for chatbot functionality
- **Flask & React** for full-stack development

