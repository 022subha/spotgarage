const cloudinary = require("cloudinary");

exports.addGarage = async (req, res, next) => {
  try {
    const {
      garageName,
      location,
      pickUpAndDrop,
      serviceType,
      availableServices,
      availableLubricants,
    } = req.body;
    let imageUrls = [];

    if (!req.files.images[0]) {
      return res
        .status(401)
        .json({ status: false, message: "Image of Aadhaar Card Required!!" });
    }
    if (!req.files.images[1]) {
      return res
        .status(401)
        .json({ status: false, message: "Image of Pan Card Required!!" });
    }
    if (!req.files.images[2]) {
      return res
        .status(401)
        .json({ status: false, message: "Garage Images Required!!" });
    }

    for (let i = 0; i < req.files.images.length; i++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.images[i].tempFilePath,
        { folder: "images" }
      );

      imageUrls.push({
        type: i,
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }

    const db = global.db.db("spotgarage");
    const cargarageCollection = db.collection("cargarages");
    const bikegarageCollection = db.collection("bikegarages");
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
      return res.status(200).json({ status: true, newBike });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
