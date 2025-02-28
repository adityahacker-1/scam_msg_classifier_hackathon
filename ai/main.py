import streamlit as st 
import pickle
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()

# main file which host the website and process the data

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


tfidf = pickle.load(open('vetorizer.pkl', 'rb'))
model = pickle.load(open("model.pkl", 'rb'))

st.title("SMS Spam classifier")
input_sms = st.text_area("Enter the message")

if st.button("Predict"):

    # preprocess
    transformed_sms = transform_text(input_sms)

    # vectorize
    vector_input = tfidf.transform([transformed_sms])

    # predict
    result = model.predict(vector_input)[0]

    # display
    if result == 1:
        st.header("Spam")
        
    else:
        st.header("Not spam")
