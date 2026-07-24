const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI environment variable. Add it to .env or your environment.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection


    // Define your API routes here POST
    app.post('/expense', async (req, res) => {
        const expense = req.body;
        const result = await client.db("OngreedData").collection("expense").insertOne(expense);
        res.send(result);
    });
    app.post('/order', async (req, res) => {
        const order = req.body;
        const result = await client.db("OngreedData").collection("order").insertOne(order);
        res.send(result);
    });
    app.post('/product', async (req, res) => {
        const product = req.body;
        const result = await client.db("OngreedData").collection("product").insertOne(product);
        res.send(result);
    });
    app.post('/investment', async (req, res) => {
        const investment = req.body;
        const result = await client.db("OngreedData").collection("investment").insertOne(investment);
        res.send(result);
    });
    app.post('/stock', async (req, res) => {
        const stock = req.body;
        const result = await client.db("OngreedData").collection("stock").insertOne(stock);
        res.send(result);
    });

    app.get('/expense', async (req, res) => {
      const result = await client.db("OngreedData").collection("expense").find().toArray();
      res.send(result);
    });

    app.get('/order', async (req, res) => {
      const result = await client.db("OngreedData").collection("order").find().toArray();
      res.send(result);
    });
    app.get('/product', async (req, res) => {
      const result = await client.db("OngreedData").collection("product").find().toArray();
      res.send(result);
    });
    app.get('/investment', async (req, res) => {
      const result = await client.db("OngreedData").collection("investment").find().toArray();
      res.send(result);
    });
    app.get('/stock', async (req, res) => {
      const result = await client.db("OngreedData").collection("stock").find().toArray();
      res.send(result);
    });

    app.patch('/order/:id', async (req, res) => {
      const id = req.params.id;
      const updatedOrder = req.body;
      const result = await client.db("OngreedData").collection("order").updateOne({ _id: id }, { $set: updatedOrder });
      res.send(result);
    });

app.patch('/stock/:id', async (req, res) => {
  const id = req.params.id;
  const updatedStock = req.body;
  const result = await client.db("OngreedData").collection("stock").updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedStock }
  );
  res.send(result);
});



// ✅ CORRECT
import mongoose from 'mongoose';

app.delete('/product/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let deletedProduct;

    // Check if identifier is a valid 24-character hex ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      deletedProduct = await Product.findByIdAndDelete(identifier);
    } else {
      // Decode URI components in case the product name has spaces/special characters
      const productName = decodeURIComponent(identifier);
      deletedProduct = await Product.findOneAndDelete({ name: productName });
    }

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Also delete associated stock items if applicable
    await Stock.deleteMany({ name: deletedProduct.name });

    return res.status(200).json({ message: 'Product and associated stock deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB!");

    // Optional: Start your Express server ONLY after a successful DB connection
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
  // REMOVED the finally block with client.close() so the connection stays alive
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});