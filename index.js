const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors()); // using middleware
app.use(express.json()); // to Body parse

require('dotenv').config(); // For storing DB name & password security


/* ********************
  DB connection & setup
  ******************** */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.12dph.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    const userCollection = client.db("messMealDB").collection("user"); // taking database & collection
    const user = {emailId: "something", password: "something"}; // creating data 
    const result = await userCollection.insertOne(user) // inserting data into the collection
    console.log(result)
  }
  finally{
    // here we can put code to end the connection.
  }
}

run().catch(console.dir)

app.listen(port, () => {
    console.log('Server running');
})