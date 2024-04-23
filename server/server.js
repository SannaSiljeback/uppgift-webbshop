// const mongodb = require("mongodb");
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/shop";
// const client = new mongodb.MongoClient(url);
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Products = require("./models/products");
const Orders = require("./models/orders");

//är för admin
app.get("/orders-with-details", async (req, res) => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/shop")
      .then(console.log("connected to database"));
    const pipeline = [
      {
        $lookup: {
          from: "lineItems",
          localField: "orderId",
          foreignField: "id",
          as: "lineItems",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "id",
                as: "linkedProduct",
              },
            },
            {
              $addFields: {
                linkedProduct: {
                  $first: "$linkedProduct",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "linkedCustomer",
        },
      },
      {
        $addFields: {
          linkedCustomer: {
            $first: "$linkedCustomer",
          },
          calculatedTotal: {
            $sum: "$lineItems.totalPrice",
          },
        },
      },
    ];

    const ordersWithDetails = await Orders.aggregate(pipeline);
    res.json(ordersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PRODUKTER
//hämtar produkter, färdig?
app.get("/", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    Products.find().then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// Lägger till produkter
app.post("/create-product", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    const product = new Products({
      name: "ananas",
      description: "en gul frukt",
      price: 45,
      image: "https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      inStock: 55,
      status: "active",
    });

    product.save().then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// Uppdaterar existerande produkter
app.put("/update-product", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    Products.findByIdAndUpdate("321", {
      description: "en rolig sak",
    }).then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});


//ORDRAR
//hämtar ordrar
// app.get("/orders", async (req, res) => {
//   try {
//     await mongoose.connect(url).then(console.log("connected"));

//     Orders.find().then((result) => {
//       res.send(result);
//       mongoose.connection.close();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// Lägger till ordrar
app.post("/create-order", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    const order = new Orders({
      _id: "6789",
      customer: "test@testsson.test",
      orderDate: new Date(),
      status: "unpaid",
      totalPrice: 20,
      paymentId: "unpaid",
    });

    order.save().then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});

// Uppdaterar existerande order
app.put("/update-order", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

    Orders.findByIdAndUpdate("6789", {
      status: "paid",
    }).then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});


//CUSTOMERS
//Hämtar användare
app.get("/customers", async (req, res) => {
  try {
    await mongoose.connect(url).then(console.log("connected"));

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
    await mongoose.connect(url).then(console.log("connected"));

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
      address: "Siljegatan 2",
    }).then((result) => {
      res.send(result);
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
});


app.listen(3000, () => console.log("Server is up and running..."));
