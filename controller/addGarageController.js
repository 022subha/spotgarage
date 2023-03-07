const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  region: process.env.S3_REGION,
});

exports.addGarage = async (req, res, next) => {
  console.log(process.env.S3_ACCESS_KEY_ID);
  try {
    const {
      garageName,
      location,
      pickUpAndDrop,
      serviceType,
      availableServices,
      availableLubricants,
    } = req.body;

    // Check if images are included in the request
    const images = req.files;

    const db = global.db.db("spotgarage");
    const cargarageCollection = db.collection("cargarages");
    const bikegarageCollection = db.collection("bikegarages");

    // Upload all images to S3
    const uploadPromises = images.map((image) => {
      // Create a unique filename for the image
      const imageName = Date.now() + "-" + image.originalname;

      // Set up S3 parameters for the image upload
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageName,
        Body: image.buffer,
      };

      return s3.upload(params).promise();
    });

    const s3DataArray = await Promise.all(uploadPromises);

    // Save image URLs in the database
    const imageUrlArray = s3DataArray.map((s3Data) => s3Data.Location);

    if (serviceType === "FW04") {
      let newCar = await cargarageCollection.insertOne({
        garageName,
        location,
        pickUpAndDrop,
        availableServices,
        availableLubricants,
        imageUrls: imageUrlArray,
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
        imageUrls: imageUrlArray,
      });
      res.status(200).json({ status: true, newBike });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
