import os
import requests
from flask import Flask, request, make_response, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import insert_test_document
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path = "./env.local")
UNSPLASH_URL ="https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY","")

# DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert line")
print(UNSPLASH_KEY)

app = Flask(__name__)
CORS(app)
app.debug = True

insert_test_document()


# myapp.config["DEBUG"] = DEBUG

@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    print(word)
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID "+ UNSPLASH_KEY
    }
    params = {
        "query":word
          }
    response = requests.get(url="https://api.unsplash.com/photos/random",headers=headers, params=params)
    data = response.json()
    print(response.json())
    return data

@app.route("/images", methods=["GET", "POST"])
def images():
    # Read Images from the database
    if request.method == "GET":
        images = images_collection.find({})
        return  jsonify([img for img in images])

    # Save images into the db
    if request.method == "POST":
        # json.loads(request.data) convert to object
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id":inserted_id}



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)