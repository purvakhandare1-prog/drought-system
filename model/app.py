from flask import Flask, render_template, request
import pandas as pd
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

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

@app.route("/", methods=["GET", "POST"])
def home():
    prediction_text = ""
    
    if request.method == "POST":
        rainfall = float(request.form["rainfall"])
        temperature = float(request.form["temperature"])
        
        new_data = pd.DataFrame([[rainfall, temperature]], 
                                columns=["rainfall", "temperature"])
        
        prediction = model.predict(new_data)
        
        if prediction[0] == 1:
            prediction_text = "⚠ Drought Warning"
        else:
            prediction_text = "✅ No Drought"
    
    return render_template("index.html", prediction=prediction_text)

if __name__ == "__main__":
    app.run(debug=True)