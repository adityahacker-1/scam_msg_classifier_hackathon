import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

# Initialize OpenAI API key
openai.api_key = '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'  

ps = PorterStemmer()

# Load pre-trained vectorizer and model for SMS Spam Classification
tfidf = pickle.load(open('vetorizer.pkl', 'rb'))
model = pickle.load(open("model.pkl", 'rb'))

app = Flask(__name__)
CORS(app)

# Chat history to store conversation with the bot
chatStr = ""

# Text transformation for spam classification
def transform_text(text):
    text = text.lower()
    text = text.split()
    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)

# Route for SMS Spam Classification
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the data sent by the React frontend
    input_sms = data['sms']
    
    # Preprocess and vectorize the input
    transformed_sms = transform_text(input_sms)
    vector_input = tfidf.transform([transformed_sms])
    
    # Predict using the model
    result = model.predict(vector_input)[0]
    
    # Return the result as JSON
    if result == 1:
        return jsonify({'prediction': 'Spam'})
    else:
        return jsonify({'prediction': 'Not spam'})

# Chatbot function using OpenAI's GPT model
def chat(query):
    global chatStr
    
    # Append the user's message to the chat history
    chatStr += f"User: {query}\nBot: "
    
    try:
        # Request OpenAI GPT chat completion
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": chatStr}],
            temperature=1,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        
        # Append the bot's response to the chat history
        chatStr += f"{response.choices[0].message['content']} \n"
        
        # Return the bot's response
        return response.choices[0].message['content']
    except Exception as e:
        return str(e)

# Route for Chatbot interaction
@app.route('/chat', methods=['POST'])
def handle_chat():
    data = request.get_json()  # Get the data sent by the React frontend
    user_query = data.get("query", "")  # Get the user's query

    # Get the chatbot's response
    response = chat(user_query)

    # Return the bot's response as JSON
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
