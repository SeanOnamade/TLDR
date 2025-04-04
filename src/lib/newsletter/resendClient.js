// newsletter/resendClient.js
require("dotenv").config(); // So we can read RESEND_API_KEY from .env
const { Resend } = require("resend");

// 1. Create Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = { resend };
