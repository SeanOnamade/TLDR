// src/lib/newsletter/cron.js
require("dotenv").config();
const cron = require("node-cron");
const { fetchAllUids } = require("./fetchAllUids");
const { sendNewsletter } = require("./sendNewsletter");

console.log("🕒 Cron job initialized... Waiting to send emails.");

// Schedule task to run daily at 8 AM server time??
cron.schedule("52 16 * * 3", async () => {
  try {
    console.log("Weekly newsletter cron started...");

    // 2) Get all user IDs from Firestore
    const uids = await fetchAllUids();
    console.log(`Found ${uids.length} users.`);

    // 3) For each UID, call sendNewsletter
    for (const uid of uids) {
      try {
        await sendNewsletter(uid);
      } catch (error) {
        console.error(`Error sending newsletter to UID ${uid}:`, error);
      }
    }

    console.log("Weekly newsletter cron finished!");
  } catch (err) {
    console.error("Cron job failed:", err);
  }
});
