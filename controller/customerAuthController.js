const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { sendOtp, verifyOtp } = require("../util/otp.js");

//* Helper functions
const registerTheUser = async (username, phone, email, collection) => {
  let user = await collection.findOne({ phone });

  if (!user) {
    let newUser = await collection.insertOne({
      username,
      phone,
      email,
      createdAt: new Date(),
    });
    return { status: true, newUser };
  } else return { status: false, msg: "User already exist!!", user };
};

//* Mobile Number Validation functions
function transform(mobile) {
  const pattern = /^\+91\d{10}$/;

  if (!pattern.test(mobile)) {
    if (!mobile.startsWith("+91")) {
      mobile = "+91" + mobile;
      return mobile;
    }
  }

  if (!pattern.test(mobile)) {
    throw new Error(
      "Issue at the register user number pipeline and the received phone-no is " +
        mobile
    );
  }

  return mobile;
}

//* Main functions
exports.userRegister = async (req, res, next) => {
  try {
    let { userMobile, userName, userEmail } = req.body;
    userMobile = transform(userMobile);
    const db = global.db.db("spotgarage");
    const collection = db.collection("vendors");

    const data = await registerTheUser(
      userName,
      userMobile,
      userEmail,
      collection
    );

    !data.status
      ? res.status(400).json({ status: false, message: data.msg })
      : res.status(200).send(data.newUser);
  } catch (err) {
    console.log(err);
  }
};

exports.userOtpSend = async (req, res) => {
  try {
    let { userMobile } = req.body;
    userMobile = await transform(userMobile);
    (await sendOtp(userMobile))
      ? res
          .status(200)
          .json({ status: true, message: "Otp Sent Successfully!!" })
      : res.status(400).json({ status: false, message: "Otp Not Sent!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.userOtpVerify = async (req, res, next) => {
  try {
    let { userMobile, userOtp } = req.body;
    userMobile = await transform(userMobile);
    const db = global.db.db("spotgarage");
    const collection = db.collection("vendors");

    if (await verifyOtp(userMobile, userOtp)) {
      let user = await collection.findOne({ phone: userMobile });
      if (user) {
        const payload = {
          _id: user._id,
          name: user.username,
          phone: user.phone,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
          status: true,
          loginStatus: true,
          message: "Go for Login!!",
          token,
        });
      } else {
        const payload = {
          _id: ObjectId(),
          phone: userMobile,
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(201).json({
          status: true,
          loginStatus: false,
          message: "Go for Registration!!",
          token,
        });
      }
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Otp Verification Failed!!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
