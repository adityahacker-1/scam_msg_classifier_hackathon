import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import nltk
# nltk.download('all')

# Read the CSV file (adjust encoding if needed)
df = pd.read_csv('spam.csv', encoding='latin-1')

# # Show 5 random samples
# print(df.sample(5))

# # (Optional) Print the first few rows to get a sense of the data
# print(df.head())

# print(df.shape)


### Data cleaning
# print(df.info()) # list values in columns

# Drop columns
df.drop(columns=['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], inplace=True)

# print(df.sample(5))

# rename the columns
df.rename(columns={'v1':'target', 'v2':'text'}, inplace = True)
# print(df.sample(5))

encoder = LabelEncoder()
df['target'] = encoder.fit_transform(df['target'])
# 1 scam
# 0 not scam
# print(df.head())

# missing values
# print(df.isnull().sum())

# check for duplicate values -> 403 duplicate values
# print(df.duplicated().sum())

# remove duplicates
df = df.drop_duplicates(keep='first')
# print(df.shape)

### EDA
# print(df['target'].value_counts())
plt.pie(df['target'].value_counts(), labels = ['ham', 'spam'],  autopct="%0.2f")
# plt.show()

# counting number of characters and making a new column
df['num_characters'] = df['text'].apply(len)
# print(df.head())

### num of words (todo)

# df['num_words'] = df['text'].apply(lambda x:len(nltk.word_tokenize(x)))
# print(df.head())


### Text Preprocessing
### Model Building
### Evaluation
### Improvement
### Website
### Deploy