//hela hans kod
let mongodb = require("mongodb");
let express = require("express");

let app = express();
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);


app.use(express.json());
app.use(express.urlencoded());


app.get("/", (request, response) => {
    
    let url = 'mongodb://localhost:27017';
    let client = new mongodb.MongoClient(url);

    client.connect().then(() => {
        console.log("connected");

        let db = client.db('shop');
        let collection = db.collection('orders');

        

            return collection.find({}).toArray().then((results) => {
                console.log("Found", results);
                response.json(results);
            });

    }).finally(() => {
        client.close();
    })
});

app.get("/", async (request, response) => {
    
  let orders = await DatabaseConnection.getInstance().getAllOrders();
  response.json(orders);

  }
);

app.get("/products", async (request, response) => {

//METODO: connect to database
  response.json([{"id": 1, "name": "Product 1"}, {"id": 2, "name": "Product 2"}]);

  }
);

app.post("/create-order", async (request, response) => {
  
  let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(request.body.email, request.body.name,  request.body.address);
  let order = await DatabaseConnection.getInstance().createOrder(request.lineItems, customer);
  
  response.json(order);

  }
);

app.listen(3000);














//min kod
// app.get("/", (req, res) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);

//   client
//     .connect()
//     .then(() => {
//       console.log("connected");

//       let db = client.db("shop");
//       let collection = db.collection("products");

//       return collection
//         .find({ a: 1 })
//         .toArray()
//         .then((results) => {
//           console.log("found", results);
//           res.json(results);
//         });
//     })
//     .finally(() => {
//       client.close();
//     });
// });

//min kod, funkar tror jag?
// app.get("/", (request, response) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);
//   client
//     .connect()
//     .then(() => {
//       console.log("connected");
//       let db = client.db("shop");
//       let collection = db.collection("products");
//       return collection
//         .find({})
//         .toArray()
//         .then((results) => {
//           console.log("Found", results);
//           response.json(results);
//         });
//     })
//     .finally(() => {
//       client.close();
//     });
// });


//från föreläsningen, ska va med??
// app.get("/products", (request, response) => {
//   response.json([
//     { id: 1, name: "produkt 1" },
//     { id: 2, name: "produkt 2" },
//   ]);
// });

//från föreläsningen
// app.post("/create-order", async (request, response) => {
    
//   let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(request.body.email, request.body.name,  request.body.address);
//   let order = await DatabaseConnection.getInstance().createOrder(request.lineItems, customer);
  
//   response.json(order);

//   }
// );

//min kod,funkar men blir error
// app.post("/create-order", (request, response) => {
//   let url = "mongodb://localhost:27017";
//   let client = new mongodb.MongoClient(url);
//   client
//     .connect()
//     .then(() => {
//       console.log("Connected to database");
//       let db = client.db("shop");
//       let ordersCollection = db.collection("orders");
//       // Antag att order information kommer från klienten via request body
//       // Du behöver body-parser middleware för att detta ska fungera:
//       let newOrder = {
//         orderId: "123", // bör vara unikt, kanske genererat eller skickat av klienten
//         customer: "test-customer",
//         items: [
//           { productId: "productId1", quantity: 2, price: 1000 },
//           { productId: "productId2", quantity: 1, price: 2000 },
//         ],
//         totalPrice: 8000,
//       };
//       return ordersCollection.insertOne(newOrder).then(() => {
//         console.log("Order created", newOrder);
//         response.status(201).send("Order created");
//       });
//     })
//     .catch((err) => {
//       console.error("Failed to create order", err);
//       response.status(500).send("Failed to create order");
//     })
//     .finally(() => {
//       client.close();
//     });

//   request.body.name;
//   response.json({ test: request.body.name });
// });



//koppling mellan först order och line items sen orders och customer, stämmer ej?
// [
//   {
//     $lookup:
//       {
//         from: "lineItems",
//         localField: "_id",
//         foreignField: "orderId",
//         as: "lineItems",
//       },
//   },
//   {
//     $lookup:
//       {
//         from: "customers",
//         localField: "customer",
//         foreignField: "_id",
//         as: "linkedCustomer",
//       },
//   },
// ]
