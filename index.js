const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

// --------------------------------------

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hm5pps9.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client.db("twoTires").collection("categories");
    const allbikesCollection = client.db("twoTires").collection("allbikes");

    app.get("/categories", async (req, res) => {
      const query = {};
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get("/bikes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id };
      const cursor = allbikesCollection.find(query);
      const result = await cursor.toArray();
      // console.log(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

// ----------------------------------
app.get("/", (req, res) => {
  res.send("server is runnig");
});

app.listen(port, () => {
  console.log(`server running port is: ${port}`);
});
