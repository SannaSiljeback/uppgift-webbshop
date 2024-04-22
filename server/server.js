let mongodb = require("mongodb");
let express = require("express");
let app = express();
let url = "mongodb://localhost:27017";
let client = new mongodb.MongoClient(url);



//PRODUKTER
// hämtar produkter
app.get("/", (request, response) => {
    let db = client.db("shop");
    let collection = db.collection("products");
    client
      .connect()
      .then(() => {
        console.log("Connected");
  
        return collection
          .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
          .toArray()
          .then((results) => {
            console.log("Found", results);
            response.send(results);
          });
      })
      .finally(() => {
        client.close();
      });
  });
  
  // Lägger till produkter
  app.post("/create-product", (request, response) => {
    client
      .connect()
      .then(async () => {
        console.log("Connected");
        let db = client.db("shop");
        let collection = db.collection("products");
  
        await collection.insertOne({
            _id: "123456",
            name: "test produkt 10",
            image: null,
            inStock: 50,
            price: 100,
            status: "active",
            description: "..."
        });
  
        return collection
          .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
          .toArray()
          .then((results) => {
            console.log("Found", results);
            response.send(results);
          });
      })
      .finally(() => {
        client.close();
      });
  });
  
  // Uppdaterar existerande produkter
  app.put("/update-product", (request, response) => {
    client
      .connect()
      .then(async () => {
        console.log("Connected");
        let db = client.db("shop");
        let collection = db.collection("products");
  
        const filter = { _id: "1234" };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            description: `A harvest of random numbers, such as: ${Math.random()}`,
          },
        };
  
        await collection.updateOne(filter, updateDoc, options);
  
        return collection
          .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
          .toArray()
          .then((results) => {
            console.log("Found", results);
            response.send(results);
          });
      })
      .finally(() => {
        client.close();
      });
  });


  //ORDRAR





//ANVÄNDARE
// Hämtar användare
app.get("/customers", (request, response) => {
  let db = client.db("shop");
  let collection = db.collection("customers");
  client
    .connect()
    .then(() => {
      console.log("Connected");

      return collection
        .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
        .toArray()
        .then((results) => {
          console.log("Found", results);
          response.send(results);
        });
    })
    .finally(() => {
      client.close();
    });
});

// Lägger till användare
app.post("/create-user", (request, response) => {
  client
    .connect()
    .then(async () => {
      console.log("Connected");
      let db = client.db("shop");
      let collection = db.collection("customers");

      await collection.insertOne({
        email: "test@test.com",
        firstName: "Test",
        lastName: "Testsson",
        adress: "Testgatan",
        houseNumber: "1",
        password: "p4$$w0rd",
      });

      return collection
        .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
        .toArray()
        .then((results) => {
          console.log("Found", results);
          response.send(results);
        });
    })
    .finally(() => {
      client.close();
    });
});

// Uppdaterar existerande användare
app.put("/update-user", (request, response) => {
  client
    .connect()
    .then(async () => {
      console.log("Connected");
      let db = client.db("shop");
      let collection = db.collection("customers");

      const filter = { email: "test@test.com" };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`,
        },
      };

      await collection.updateOne(filter, updateDoc, options);

      return collection
        .find({}) //om vi vill hitta allt från listan lämnar vi detta tomt
        .toArray()
        .then((results) => {
          console.log("Found", results);
          response.send(results);
        });
    })
    .finally(() => {
      client.close();
    });
});



app.listen(3000, () => console.log("Server is up and running..."));
