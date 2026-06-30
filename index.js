const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Note: It's best practice to hide credentials using environment variables (process.env)
const uri = "mongodb+srv://ongreed:hx9fA7yzP7yDZ6Nf@ongreeddata.hdfsbys.mongodb.net/?appName=OngreedData";

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

    app.post('/expense', async (req, res) => {
      console.log(req.body);
        const expense = req.body;
        const result = await client.db("OngreedData").collection("expense").insertOne(expense);
        res.send(result);
        console.log(result);
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