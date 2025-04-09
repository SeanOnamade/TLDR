// newsletter/fetchUserSources.js
// fetchUserSources.js
const { dbAdmin } = require("../firebaseAdmin");
const { doc, getDoc } = require("firebase-admin/firestore"); // Admin-based imports differ slightly

async function fetchUserSources(uid) {
  // 1. Get the user doc
  const userRef = dbAdmin.collection("users").doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new Error(`User ${uid} not found`);
  }

  // 2. Return the doc data
  const userData = userSnap.data();
  // userData.sources might look like:
  // [
  //   { endpoint: "/economist-pick-of-day", image: "Economist.webp", name: "Economist" },
  //   { endpoint: "/people-pick-of-day", image: "People.webp", name: "People" }
  // ]
  return userData;
}

module.exports = { fetchUserSources };
