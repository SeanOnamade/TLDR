// src/lib/newsletter/cron.js
require("dotenv").config();
const cron = require("node-cron");
const { fetchAllUids } = require("./fetchAllUids");
const { sendNewsletter } = require("./sendNewsletter");

console.log("🕒 Cron job initialized... Waiting to send emails.");

// Schedule task to run daily at 8 AM server time??
// cron.schedule("30 21 * * 4", async () => {

// temp test
// cron.schedule("0 14 1-31/2 * *", async () => {
cron.schedule("10 20 2-30/2 * *", async () => {
  try {
    console.log("Tri-weekly newsletter cron started, every other day at 9am...");

    // 1) Get all user IDs from Firestore
    const uids = await fetchAllUids();
    console.log(`Found ${uids.length} users.`);

    // 2) For each UID, call sendNewsletter
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
