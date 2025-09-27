const { User } = require("../models");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");

const createUser = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;

    const user = await User.create({
      email,
      password: hashPassword(password),
      name,
      phone,
    });

    res.status(201).json({
      message: "User berhasil dibuat",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password harus diisi",
      });
    }

    const checkUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }
    if (!comparePassword(password, checkUser.password)) {
      return res.status(401).json({
        message: "Password belum sesuai silahkan cek kembali",
      });
    }

    const payload = {
      id: checkUser.id,
      email: checkUser.email,
      name: checkUser.name,
      phone: checkUser.phone,
    };

    const token = createToken(payload);

    res.status(201).json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res.status(400).json({
        message: "Password tidak boleh kosong",
      });
    }

    const checkUser = await User.findByPk(userId);

    if (!checkUser) {
      return res.status(404)({
        message: "User tidak ditemukan",
      });
    }
    if (!comparePassword(password, checkUser.password)) {
      return res.status({
        message: "Password lama tidak sesuai",
      });
    }

    checkUser.password = hashPassword(newPassword) ?? checkUser.password;
    await checkUser.save();

    res.status(200).json({
      message: "Password berhasil diubah",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser, updatePassword };
