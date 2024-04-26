// const mongodb = require("mongodb");
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/shop";
// const client = new mongodb.MongoClient(url);
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Products = require("./models/products");
const Orders = require("./models/orders");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PRODUKTER
//hämtar produkter, färdig?
app.get("/", async (req, res) => {
  try {
    Products.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/create-product", async (req, res) => {
  try {
    const { name, description, price, image, inStock, status } = req.body;

    const product = new Products({
      name,
      description,
      price,
      image,
      inStock,
      status,
    });

    const result = await product.save();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding product");
  }
});

app.put("/update-product/:id", async (req, res) => {
  try {
    const { name, description, price, image, inStock, status } = req.body;
    const productId = req.params.id;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        image,
        inStock,
        status,
      },
      { new: true }
    );

    res.send(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating product");
  }
});

//ta bort produkt
app.delete("/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);
    res.send(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting product");
  }
});


//ORDRAR
//är för admin, hämtar ordrar med detaljer
app.get("/orders-with-details", async (req, res) => {
  try {
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
        $addFields: {
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

// Lägger till ordrar, ska kopplas till cart, köp knappen, behövs en lookup med en lineitems
app.post("/create-order", async (req, res) => {
  try {
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
    });
  } catch (error) {
    console.log(error);
  }
});




///BEHÖVS EJ?
// Uppdaterar existerande order
app.put("/update-order", async (req, res) => {
  try {
    Orders.findByIdAndUpdate("6789", {
      status: "paid",
    }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});





//TA BORT OM MAN EJ HAR INLOGG
//CUSTOMERS
//Hämtar användare
// app.get("/customers", async (req, res) => {
//   try {
//     Customers.find().then((result) => {
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Lägger till användare
// app.post("/create-customer", async (req, res) => {
//   try {
//     const customer = new Customers({
//       _id: "test@testsson.test",
//       firstName: "Test",
//       lastName: "Testsson",
//       address: "Testgatan 1",
//       password: "1234",
//     });

//     customer.save().then((result) => {
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Uppdaterar existerande användare
// app.put("/update-customer", async (req, res) => {
//   try {
//     Customers.findByIdAndUpdate("test@testsson.test", {
//       firstName: "Sanna",
//       lastName: "Silje",
//       address: "Siljegatan 2",
//     }).then((result) => {
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

mongoose.connect(url).then(() => {
  console.log("Connected to database");
  app.listen(3000, () => console.log("Server is up and running..."));
});
