const bcrypt = require("bcrypt");

module.exports = {
  generateHash: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  compareHash: (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};
