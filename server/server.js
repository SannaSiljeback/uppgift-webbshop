// const mongodb = require("mongodb");
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/shop";
// const client = new mongodb.MongoClient(url);
const mongoose = require("mongoose");
const Customers = require("./models/customers");

//PRODUKTER
// hämtar produkter
app.get("/", (req, res) => {

});

// Lägger till produkter
app.post("/create-product", (req, res) => {

});

// Uppdaterar existerande produkter
app.put("/update-product", (req, res) => {

});

//ORDRAR
//hämtar ordrar
app.get("/orders", (req, res) => {

});

// Lägger till ordrar
app.post("/create-order", (req, res) => {

});

// Uppdaterar existerande order
app.put("/update-order", (req, res) => {
  
});

//CUSTOMERS
// Hämtar användare
app.get("/customers", async (req, res) => {
  try {
    await mongoose
      .connect(url)
      .then(console.log("connected"));

    Customers.find().then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// Lägger till användare
app.post("/create-customer", async (req, res) => {
  try {
    await mongoose
      .connect(url)
      .then(console.log("connected"));

    const customer = new Customers({
      _id: "test@testsson.test",
      firstName: "Test",
      lastName: "Testsson",
      address: "Testgatan 1",
      password: "1234",
    });

    customer.save().then((result) => {
      res.send(result);
      mongoose.connection.close();
    });

  } catch (error) {
    console.log(error);
  }
});

// Uppdaterar existerande användare
app.put("/update-customer", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    Customers.findByIdAndUpdate("test@testsson.test", {
      firstName: "Sanna",
      lastName: "Silje",
      address: "Siljegatan 2"
    }).then((result) => {

      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// //PRODUKTER
// // hämtar produkter
// app.get("/", (request, response) => {
//     let db = client.db("shop");
//     let collection = db.collection("products");
//     client
//       .connect()
//       .then(() => {
//         console.log("Connected");

//         return collection
//           .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//           .toArray()
//           .then((results) => {
//             console.log("Found", results);
//             response.send(results);
//           });
//       })
//       .finally(() => {
//         client.close();
//       });
//   });

//   // Lägger till produkter
//   app.post("/create-product", (request, response) => {
//     client
//       .connect()
//       .then(async () => {
//         console.log("Connected");
//         let db = client.db("shop");
//         let collection = db.collection("products");

//         await collection.insertOne({
//             _id: "123456",
//             name: "test produkt 10",
//             image: null,
//             inStock: 50,
//             price: 100,
//             status: "active",
//             description: "..."
//         });

//         return collection
//           .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//           .toArray()
//           .then((results) => {
//             console.log("Found", results);
//             response.send(results);
//           });
//       })
//       .finally(() => {
//         client.close();
//       });
//   });

//   // Uppdaterar existerande produkter
//   app.put("/update-product", (request, response) => {
//     client
//       .connect()
//       .then(async () => {
//         console.log("Connected");
//         let db = client.db("shop");
//         let collection = db.collection("products");

//         const filter = { _id: "1234" };
//         const options = { upsert: true };
//         const updateDoc = {
//           $set: {
//             description: `A harvest of random numbers, such as: ${Math.random()}`,
//           },
//         };

//         await collection.updateOne(filter, updateDoc, options);

//         return collection
//           .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
//           .toArray()
//           .then((results) => {
//             console.log("Found", results);
//             response.send(results);
//           });
//       })
//       .finally(() => {
//         client.close();
//       });
//   });

app.listen(3000, () => console.log("Server is up and running..."));
