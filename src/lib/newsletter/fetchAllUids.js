// newsletter/fetchAllUids.js
const { dbAdmin } = require("../firebaseAdmin"); 
// or wherever your Admin SDK is initialized

async function fetchAllUids() {
  const snapshot = await dbAdmin.collection("users").get();
  snapshot.forEach(doc => {
    console.log("Found doc ID:", doc.id);
  });
  return snapshot.docs.map((doc) => doc.id);
}

module.exports = { fetchAllUids };
