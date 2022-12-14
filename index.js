const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const usersCollection = client.db("twoTires").collection("users");
    const ordersCollection = client.db("twoTires").collection("orders");
    const reporteditemCollection = client
      .db("twoTires")
      .collection("reporteditems");
    const advertiesCollection = client
      .db("twoTires")
      .collection("advertisement");

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

    //create user
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

    //find all user
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    //user get
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //user find
    app.get("/members/:role", async (req, res) => {
      const role = req.params.role;
      const query = { roleIndentify: role };
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //user find
    app.get("/members/:role", async (req, res) => {
      const role = req.params.role;
      const query = { roleIndentify: role };
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // delete
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      console.log(query);
      res.send(result);
    });

    // for insert a orders
    app.post("/allorders", async (req, res) => {
      const orders = req.body;
      console.log(orders);
      const result = await ordersCollection.insertOne(orders);
      res.send(result);
    });

    //add product
    app.post("/bikes", async (req, res) => {
      const bike = req.body;
      const result = await allbikesCollection.insertOne(bike);
      res.send(result);
    });

    //all products
    app.get("/bikes", async (req, res) => {
      const query = {};
      const cursor = allbikesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    //seller product find by email
    app.get("/bike/:email", async (req, res) => {
      const email = req.params.email;
      const query = { seller_email: email };
      const cursor = allbikesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // delete product
    app.delete("/bikes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allbikesCollection.deleteOne(query);
      console.log(query);
      res.send(result);
    });

    // reported item
    app.post("/reportedItem/:id", async (req, res) => {
      const id = req.body;
      const result = await reporteditemCollection.insertOne(id);
      res.send(result);
    });

    // show reported item
    app.get("/reportedItem", async (req, res) => {
      const query = {};
      const cursor = reporteditemCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    //get all oders
    app.get("/allorders", async (req, res) => {
      const query = {};
      const cursor = ordersCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    //buyer orders find by email
    app.get("/order/:email", async (req, res) => {
      const email = req.params.email;
      const query = { useremail: email };
      const cursor = ordersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //advertise
    app.post("/advertise", async (req, res) => {
      const item = req.body;
      const result = await advertiesCollection.insertOne(item);
      res.send(result);
    });

    //advertise
    app.get("/advertise", async (req, res) => {
      const query = {};
      const cursor = advertiesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
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
