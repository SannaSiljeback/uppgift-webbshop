console.log("index.js");

let mongodb = require("mongodb");

let url = "mongodb://localhost:27017";
let client = new mongodb.MongoClient(url);

client.connect().then(() => {
  console.log("connected");

  let db = client.db("shop");
  let collection = db.collection("products");

  return collection.insertMany([{a:1}]).then(() => {
    console.log("inserted");

    return collection.find({a:1}).toArray().then((results) => {
        console.log("found", results);
    })
  });

}).finally(() => {
    client.close();
})
