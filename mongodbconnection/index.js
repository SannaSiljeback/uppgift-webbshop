console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");

let app = express();

app.get("/", (req, res) => {
  let url = "mongodb://localhost:27017";
  let client = new mongodb.MongoClient(url);

  client
    .connect()
    .then(() => {
      console.log("connected");

      let db = client.db("shop");
      let collection = db.collection("products");

      return collection
        .find({ a: 1 })
        .toArray()
        .then((results) => {
          console.log("found", results);
          res.json(results);
        });
    })
    .finally(() => {
      client.close();
    });
});

app.listen(3000);
