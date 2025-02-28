import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from flask import Flask, request, jsonify
from flask_cors import CORS


ps = PorterStemmer()

# Load pre-trained vectorizer and model
tfidf = pickle.load(open('vetorizer.pkl', 'rb'))
model = pickle.load(open("model.pkl", 'rb'))

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
