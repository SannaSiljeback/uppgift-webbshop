let mongodb = require("mongodb");
let express = require("express");
let app = express();
let url = "mongodb://localhost:27017";
let client = new mongodb.MongoClient(url);

// Hämtar användare
app.get("/", (request, response) => {
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