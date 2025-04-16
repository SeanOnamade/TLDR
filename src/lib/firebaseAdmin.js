// src/lib/firebaseAdmin.js
require("dotenv").config();
const admin = require("firebase-admin");
let serviceAccount;
if (process.env.SERVICE_ACCOUNT_JSON_KEY) {
  // Production or local with inline JSON
  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON_KEY);
} else {
  // Fallback: read local file
  serviceAccount = require("../../serviceAccountKey.json");
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // projectId: "focus-feed-132f8",
  });
  console.log("Admin SDK Project ID:", admin.app().options.projectId);
}

// 2. Export the Firestore instance
const dbAdmin = admin.firestore();
async function listUserDocs() {
  const snapshot = await dbAdmin.collection("users").get();
  snapshot.forEach(doc => {
    console.log("Found doc ID:", doc.id);
  });
}

// listUserDocs();

module.exports = { dbAdmin };
