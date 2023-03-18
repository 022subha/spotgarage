const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, message: "Aunthentication Failed!!" });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Authentication Failed!!" });
  }
};

module.exports = authMiddleware;
