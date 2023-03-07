// Middleware to check if the vendor is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ status: false, message: "Unauthorized" });
  }
};
