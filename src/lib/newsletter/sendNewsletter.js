// newsletter/sendNewsletter.js
require("dotenv").config();
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { resend } = require("./resendClient");
const FocusFeedNewsletter = require("./FocusFeedNewsletter.js");
const { getRandomImageUrl } = require("./randomImage");
const { fetchUserSources } = require("./fetchUserSources");

async function fetchArticlesForUser(uid) {
  const fetch = await import("node-fetch");
  const baseURL = "https://newsapi-r8fr.onrender.com";

  // 1. Get user data from Firestore
  const userData = await fetchUserSources(uid);

  const {
    firstName = "",
    lastName = "",
    language = "en",
    onboarded = false,
    sources = [],
    topics = [],
    email = "",
    subscribed = true,
  } = userData;

  const articles = [];

  // 2. For each source, attempt to fetch the article
  for (const src of sources) {
    const route = src.endpoint;
    const url = baseURL + route;

    try {
      const res = await fetch.default(url);

      // If the fetch fails or returns a non-2xx status, skip it
      if (!res.ok) {
        console.log(
          `Skipping source "${src.name}" for user "${firstName}"—` +
          `fetch returned status ${res.status}`
        );
        continue;
      }

      // Attempt to parse JSON
      const articleData = await res.json();

      // Check if critical fields are present
      if (
        !articleData.article_title ||
        !articleData.article_text ||
        !articleData.article_link
      ) {
        console.log(
          `Omitting source "${src.name}" for user "${firstName}"—` +
          `missing article_text/title/link.`
        );
        continue;
      }
      let generatedImageUrl = `https://focusfeed.org/home_images/${src.name.replace(/\s+/g, '')}.webp`;

      // **###### Fix 2: Check if the generatedImageUrl exists using a HEAD request. Use random image if it fails.**
      let imageUrl = generatedImageUrl;
      try {
        const headRes = await fetch.default(generatedImageUrl, { method: 'HEAD' });
        if (!headRes.ok) {
          throw new Error('Image not found');
        }
      } catch (err) {
        console.log(`Image not found at ${generatedImageUrl}, using random fallback.`);
        imageUrl = getRandomImageUrl();
      }

      // If all good, push a cleaned-up object
      articles.push({
        title: articleData.article_title,
        summary: articleData.article_text,
        link: articleData.article_link,
        // image: getRandomImageUrl(), // or your logic
        image: imageUrl,
        sourceName: src.name,
      });
    } catch (err) {
      // This catches JSON parse errors, network errors, etc.
      console.log(
        `Skipping source "${src.name}" for user "${firstName}"—error: ${err}`
      );
    }
  }

  return {
    articles,
    firstName,
    lastName,
    language,
    onboarded,
    topics,
    email,
    subscribed
  };
}

async function sendNewsletter(uid) {
  // // 1. Get the article from your existing API
  // const article = await fetchLatestArticle();

  // // 2. Render the React Email component to static HTML
  // const emailHtml = ReactDOMServer.renderToStaticMarkup(
  //   React.createElement(FocusFeedNewsletter, { article })
  // );
  // 1. Fetch an array of articles

  // const defaultUID = "0YPGe9vAOnbZONISEnm7Nz63PqG2"; 
  const {
    articles,
    firstName,
    lastName,
    email,
    subscribed,
  } = await fetchArticlesForUser(uid);
  // const articles = await fetchArticles();
  // If absolutely no articles remain, you might want to handle that:
  // if (!articles.length) {
  //   console.log(`No valid articles found for ${firstName}—skipping send.`);
  //   return;
  // }
  if (!subscribed) {
    console.log("user not subscribed for emails");
    return;
  }
  if (!articles || !articles.length) {
    console.log(`No valid articles found for ${firstName}—skipping send.`);
    return;
  }


  // 2. Render the newsletter with all articles
  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(FocusFeedNewsletter, {
      articles,
      firstName,
      lastName,
    })
  );
  // const emailHtml = ReactDOMServer.renderToStaticMarkup(
  //   React.createElement(FocusFeedNewsletter, { articles })
  // );

  console.log(email);
  // 3. Send via Resend
  await resend.emails.send({
    // from: "FocusFeed <onboarding@resend.dev>",
    from: "FocusFeed <newsletter@focusfeed.org>",
    to: [email || "sean.d.onamade@vanderbilt.edu"], // fallback if no email
    subject: `📰 ${articles[0].title} – Your Daily Focus Feed`,
    html: emailHtml,
  });
  // await resend.emails.send({
  //   from: "onboarding@resend.dev", // or your own verified email
  //   to: ["sean.d.onamade@vanderbilt.edu"],         // or an array of subscriber emails
  //   subject: `🚀 ${articles[0].title} – Your Daily Focus Feed`,
  //   html: emailHtml,
  // });

  // console.log("✅ Newsletter sent successfully!");
  console.log(`✅ Newsletter sent successfully to ${firstName} (${email})!`);
}

// to try out, run: node src/lib/newsletter/sendNewsletter.js
// If you run this file directly with `node`, call sendNewsletter()
if (require.main === module) {
  const testUID = "P3yrTbexu3fQqcNJDdBsxktQ8ev1";
  sendNewsletter(testUID).catch(console.error);
  console.log(`Email sent to ${testUID}`)
  // sendNewsletter().catch((err) => console.error("Error sending newsletter:", err));
}

// Export for external usage if you want
module.exports = { sendNewsletter };
