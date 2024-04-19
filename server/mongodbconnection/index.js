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





//koppling mellan först order och line items sen orders och customer
// [
//   {
//     $lookup:
//       /*
//        * from: The target collection.
//        * localField: The local join field.
//        * foreignField: The target join field.
//        * as: The name for the results.
//        * pipeline: Optional pipeline to run on the foreign collection.
//        * let: Optional variables to use in the pipeline field stages.
//        */
//       {
//         from: "lineItems",
//         localField: "_id",
//         foreignField: "orderId",
//         as: "lineItems",
//       },
//   },
//   {
//     $lookup:
//       /*
//        * from: The target collection.
//        * localField: The local join field.
//        * foreignField: The target join field.
//        * as: The name for the results.
//        * pipeline: Optional pipeline to run on the foreign collection.
//        * let: Optional variables to use in the pipeline field stages.
//        */
//       {
//         from: "customers",
//         localField: "customer",
//         foreignField: "customerId",
//         as: "linkedCustomer",
//       },
//   },
// ]
