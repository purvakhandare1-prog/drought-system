import pandas as pd
from sklearn.linear_model import LogisticRegression

# Sample dataset
data = {
    "rainfall": [200, 150, 100, 50, 20],
    "temperature": [25, 30, 35, 40, 45],
    "drought": [0, 0, 0, 1, 1]
}

df = pd.DataFrame(data)

X = df[["rainfall", "temperature"]]
y = df["drought"]

model = LogisticRegression()
model.fit(X, y)

prediction = model.predict([[60, 38]])

if prediction[0] == 1:
    print("Drought Warning ⚠")
else:
    print("No Drought")