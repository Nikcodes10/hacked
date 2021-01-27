var admin = require("firebase-admin");

var serviceAccount = require("./secretKey.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});