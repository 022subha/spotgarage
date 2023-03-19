const dotenv = require("dotenv");
const connectToDb = require("./config/db.js");
dotenv.config();
const cloudinary = require("cloudinary");

(async function globalMongoConnection() {
  global.db = await connectToDb();
})();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = require("./app.js");
app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});
