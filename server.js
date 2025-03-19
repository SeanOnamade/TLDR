// server.js
require("dotenv").config();

// 1) Import the cron job so it schedules automatically
require("./src/lib/newsletter/cron.js");

// 2) Log a startup message
console.log("Focus Feed cron job scheduled...");

// 3) Keep the Node process alive with a periodic log
//    (node-cron usually keeps the process alive on its own, but
//     this setInterval ensures it doesn't exit prematurely.)
setInterval(() => {
  console.log("Still alive at", new Date().toISOString());
}, 1000 * 60 * 15); // logs every 15 minutes
