// const mongodb = require("mongodb");
const express = require("express");
const app = express();
const url = "mongodb://localhost:27017/shop";
// const client = new mongodb.MongoClient(url);
const mongoose = require("mongoose");
const Customers = require("./models/customers");
const Products = require("./models/products");
const Orders = require("./models/orders");
const LineItems = require("./models/lineItems");

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

//ändra till edit i namn?
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
          from: "lineitems",
          localField: "_id",
          foreignField: "orderId",
          as: "lineItems",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
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
          localField: "customer",
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

// Lägger till ordrar, ska kopplas till cart, köp knappen, behövs en lookup med en lineitems
app.post("/create-order", async (req, res) => {
  
  try {

    const { email, firstName, lastName, address, status, totalPrice, paymentId, lineItems } = req.body;

    const order = new Orders({
      _id: new mongoose.Types.ObjectId(),
      customer: email,
      orderDate: new Date(),
      status: status,
      totalPrice: totalPrice,
      paymentId: paymentId,
    });

    const customer = new Customers({
      _id: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      password: "1234",
    })

    //skicka med lineitems här??
   await Promise.all(lineItems.map(item => {
      console.log(item);
      const lineItem = new LineItems({
        _id: new mongoose.Types.ObjectId(),
        orderId: order._id,
        quantity: item.quantity,
        productId: item.productId,
        totalPrice: item.price*item.quantity,
      });
      return lineItem.save();
    }));
    

    await Promise.all([customer.save(), order.save()]);

    res.status(201).json({ message: "Order created successfully" });
    // order.save().then((result) => {
    //   res.send(result);
    // });
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

// Lägger till användare, behövs vid göra order?
app.post("/create-customer", async (req, res) => {
  try {
    const customer = new Customers({
      _id: "test@testsson.test",
      firstName: "Test",
      lastName: "Testsson",
      address: "Testgatan 1",
      password: "1234",
    });

    customer.save().then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

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
