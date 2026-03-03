const jwt = require("jsonwebtoken");

const authArtist = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "unathorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const role = decoded.role;

    if (role !== "artist") {
      return res
        .status(403)
        .json({ message: "you are not authorized to create album" });
    }

    req.user = decoded;

    next();
  } catch (error) {}
};

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: "unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    next()

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { authArtist ,authUser};
