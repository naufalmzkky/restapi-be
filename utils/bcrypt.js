const bcrypt = require("bcryptjs");
const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};
const comparePassword = (password, hashPwd) => {
  return bcrypt.compareSync(password, hashPwd);
};

module.exports = { hashPassword, comparePassword };
