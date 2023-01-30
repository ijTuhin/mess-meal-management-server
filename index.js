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
    const hallStudentCollection = client.db("messMealDB").collection("hallStudent"); // taking database & collection
    const hallGuestCollection = client.db("messMealDB").collection("hallGuest"); // taking database & collection

    app.post('/non-residence-student-registration', async (req,res) => {
      const hallStudent = req.body;
      const result = await hallStudentCollection.insertOne(hallStudent) // inserting/pushing registration data into the database collection
      res.send(hallStudent)
    })
    app.post('/non-residence-guest-registration', async (req,res) => {
      const hallGuest = req.body;
      const result = await hallGuestCollection.insertOne(hallGuest) // inserting/pushing registration data into the database collection
      res.send(hallGuest)
    })
  }
  finally{
    // here we can put code to end the connection.
  }
}

run().catch(console.dir)

app.listen(port, () => {
    console.log('Server running');
})