from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hello welcome to the matrix</p>"

if __name__ == "__main__":
    app.run(debug=True)
