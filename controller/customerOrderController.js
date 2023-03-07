const { ObjectId } = require("mongodb");

exports.customerOrders = async (req, res, next) => {
  try {
    const db = global.db.db("spotgarage");
    const orderCollection = db.collection("customerorders");
    const data = orderCollection.find({}).toArray();
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const db = global.db.db("spotgarage");
    const updateStatusCollection = db.collection("customerorders");
    const filter = { _id: ObjectId(orderId) };
    const update =
      status === "Accepted"
        ? { $set: { status: "Accepted" } }
        : { $set: { status: "Rejected" } };
    updateStatusCollection.updatOne(filter, update);
    res
      .status(200)
      .json({ status: true, message: "Status Updated Successfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
