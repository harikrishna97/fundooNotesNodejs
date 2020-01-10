const bcrypt = require("bcryptjs");

class UtilityClass {
  hashFunction(password) {
    const salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }
}

module.exports = new UtilityClass();
