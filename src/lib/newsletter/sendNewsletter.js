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



  // 3. For each source, call the API
  // const requests = sources.map((src) => fetch.default(baseURL + src.endpoint));
  // const responses = await Promise.all(requests);
  // const dataArray = await Promise.all(responses.map((res) => res.json()));

  // 4. Convert each response into a consistent shape

  // const articles = dataArray.map((articleData, i) => ({
  //   title: articleData.article_title,
  //   summary: articleData.article_text,
  //   link: articleData.article_link,
  //   // image: sources[i].image
  //   //   ? `https://placehold.co/600x400?text=Focus+Feed` // or your actual host
  //   //   : getRandomImageUrl(),
  //   image: getRandomImageUrl(),
  //   // or if your source has a custom image, you can do:
  //   // image: sources[i].image ? `https://example.com/home_images/${sources[i].image}` : getRandomImageUrl()
  //   sourceName: sources[i].name, // e.g. "Economist"
  // }));

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

      // If all good, push a cleaned-up object
      articles.push({
        title: articleData.article_title,
        summary: articleData.article_text,
        link: articleData.article_link,
        image: getRandomImageUrl(), // or your logic
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

// If you run this file directly with `node`, call sendNewsletter()
if (require.main === module) {
  const testUID = "P3yrTbexu3fQqcNJDdBsxktQ8ev1";
  sendNewsletter(testUID).catch(console.error);
  console.log(`Email sent to ${testUID}`)
  // sendNewsletter().catch((err) => console.error("Error sending newsletter:", err));
}

// Export for external usage if you want
module.exports = { sendNewsletter };
