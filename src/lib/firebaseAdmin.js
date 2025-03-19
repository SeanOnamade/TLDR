// src/lib/firebaseAdmin.js
require("dotenv").config();
const admin = require("firebase-admin");


// 1. Initialize the Admin SDK
// (Use your service account JSON or 'applicationDefault' if you prefer)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // or admin.credential.cert(serviceAccount),
    // You can optionally set databaseURL if using RTDB
  });
  // In firebaseAdmin.js, after admin.initializeApp():
  console.log("Admin SDK Project ID:", admin.app().options.projectId);

}

// 2. Export the Firestore instance
const dbAdmin = admin.firestore();
async function listUserDocs() {
  const snapshot = await dbAdmin.collection("users").get();
  // snapshot.forEach(doc => {
  //   console.log("Found doc ID:", doc.id);
  // });
}

listUserDocs();

module.exports = { dbAdmin };
