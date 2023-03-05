require("dotenv").config();
let connectToDb = require('./config/db');

(async function globalMongoConnection() {
    global.db = await connectToDb();
})();

const app = require('./app');


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running at port ${process.env.PORT}`);
});
