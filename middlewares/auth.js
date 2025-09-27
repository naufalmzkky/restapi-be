const { User } = require("../models");
const { verifyToken } = require("../utils/jwt");
const authenticate = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        message: "Silahkan login terlebih dahulu",
      });
    }

    const verify = verifyToken(token);

    if (!verify) {
      return res.status(401).json({
        message: "Akses tidak valid",
      });
    }

    const checkUser = await User.findByPk(verify.id);
    if (!checkUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
