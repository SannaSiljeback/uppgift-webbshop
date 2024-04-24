// const mongodb = require("mongodb");
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/shop";
// const client = new mongodb.MongoClient(url);
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Products = require("./models/products");
const Orders = require("./models/orders");

//är för admin, hämtar ordrar med detaljer
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
      name: "hippie duck",
      description: "a duck with hippie theme",
      price: 45,
      image: "https://cdn.discordapp.com/attachments/1186060160528044146/1232342739027365908/sannas3261_a_rubber_duck_in_clipart_style_with_white_background_b8e70990-50d6-4789-a2e4-ab02ac675ec8.png?ex=66291c1c&is=6627ca9c&hm=20886f4147a0fdefd39810ff872d9f911f365ad3365b38994baaade4c8bb4ce1&",
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
