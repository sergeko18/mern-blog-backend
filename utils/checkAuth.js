import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "secretKey1825");

      req.userId = decoded._id;

      next(); // Executed if all tests are successful
    } catch (err) {
      return res.status(403).json({
        message: "Don't have access",
      });
    }
  } else {
    res.status(403).json({
      message: "Don't have access",
    });
  }
};
