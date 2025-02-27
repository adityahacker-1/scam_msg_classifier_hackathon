import numpy as np
import pandas as pd

# Read the CSV file (adjust encoding if needed)
df = pd.read_csv('spam.csv', encoding='latin-1')

# Show 5 random samples
print(df.sample(5))

# (Optional) Print the first few rows to get a sense of the data
print(df.head())

print(df.shape)


# Data cleaning

# EDA
# Text Preprocessing
# Model Building
# Evaluation
# Improvement
# Website
# Deploy