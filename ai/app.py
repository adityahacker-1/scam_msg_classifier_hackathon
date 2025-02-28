import pickle
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

ps = PorterStemmer()

api_key = "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"

tfidf = pickle.load(open('vetorizer.pkl', 'rb'))
model = pickle.load(open("model.pkl", 'rb'))

app = Flask(__name__)
CORS(app)

chatStr = ""

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

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_sms = data['sms']
    
    transformed_sms = transform_text(input_sms)
    vector_input = tfidf.transform([transformed_sms])
    
    result = model.predict(vector_input)[0]
    
    if result == 1:
        return jsonify({'prediction': 'Spam'})
    else:
        return jsonify({'prediction': 'Not spam'})

def chat(query):
    global chatStr
    
    chatStr += f"User: {query}\nBot: "
    client = OpenAI(api_key=api_key)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": chatStr}
            ],
            temperature=1,
            max_tokens=1576,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
    
        chatStr += f"{response.choices[0].message.content} \n"
        
        return response.choices[0].message.content
    except Exception as e:
        return str(e)

@app.route('/chat', methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_query = data.get("query", "")

    response = chat(user_query)

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
