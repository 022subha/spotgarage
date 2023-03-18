import { MongoClient } from "mongodb";

const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const userCollection = client.db("databaseName").collection("users");
  const user = { name: "John Doe", phone: "+1234567890" };
  userCollection.insertOne(user, function (err, res) {
    console.log("User inserted");
    client.close();
  });
});
