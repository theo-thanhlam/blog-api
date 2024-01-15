const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase.config");

const firebaseApp = initializeApp(firebaseConfig);
module.exports = getStorage(firebaseApp);
