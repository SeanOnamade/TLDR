// newsletter/sendNewsletter.js
require("dotenv").config();
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { resend } = require("./resendClient");
const FocusFeedNewsletter = require("./FocusFeedNewsletter.js");

// Example function to fetch a single "Pick of the Day" from your API
async function fetchLatestArticle() {
  const fetch = await import("node-fetch"); // dynamic import if not installed globally
  const response = await fetch.default("https://newsapi-r8fr.onrender.com/wired-pick-of-day");
  const data = await response.json();

  return {
    title: data.article_title,
    image: data.article_image,
    summary: data.article_text,
    link: data.article_link,
  };
}

async function sendNewsletter() {
  // 1. Get the article from your existing API
  const article = await fetchLatestArticle();

  // 2. Render the React Email component to static HTML
  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(FocusFeedNewsletter, { article })
  );

  // 3. Send via Resend
  await resend.emails.send({
    from: "onboarding@resend.dev", // or your own verified email
    to: ["sean.d.onamade@vanderbilt.edu"],         // or an array of subscriber emails
    subject: `🚀 ${article.title} – Your Daily Focus Feed`,
    html: emailHtml,
  });

  console.log("✅ Newsletter sent successfully!");
}

// If you run this file directly with `node`, call sendNewsletter()
if (require.main === module) {
  sendNewsletter().catch((err) => console.error("Error sending newsletter:", err));
}

// Export for external usage if you want
module.exports = { sendNewsletter };
