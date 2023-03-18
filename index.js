const dotenv = require("dotenv");
const connectToDb = require("./config/db.js");
dotenv.config();

(async function globalMongoConnection() {
  global.db = await connectToDb();
})();

const app = require("./app.js");

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});
