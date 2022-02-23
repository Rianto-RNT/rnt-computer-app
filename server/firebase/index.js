
let admin = require("firebase-admin");

let firebaseServiceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;
