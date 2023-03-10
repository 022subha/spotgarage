const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `garage-images-${Date.now()}.jpeg`);
      },
    }),
  });

exports.addGarage = async (req, res, next) => {
  try {
    const uploadSingle = upload("spotgrage").array("images", 3);

    const {
      garageName,
      location,
      pickUpAndDrop,
      serviceType,
      availableServices,
      availableLubricants,
    } = req.body;
    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ status: false, message: err.message });
      const db = global.db.db("spotgarage");
      const cargarageCollection = db.collection("cargarages");
      const bikegarageCollection = db.collection("bikegarages");
      const imageUrls = req.files.map((item) => item.location);
      if (serviceType === "FW04") {
        let newCar = await cargarageCollection.insertOne({
          garageName,
          location,
          pickUpAndDrop,
          availableServices,
          availableLubricants,
          imageUrls,
        });
        res.status(200).json({ status: true, newCar });
      }
      if (serviceType === "TW04") {
        let newBike = await bikegarageCollection.insertOne({
          garageName,
          location,
          pickUpAndDrop,
          availableServices,
          availableLubricants,
          imageUrls,
        });
        res.status(200).json({ status: true, newBike });
      }
      res
        .status(501)
        .json({ status: false, message: "Not Getting the Data in req.body" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
