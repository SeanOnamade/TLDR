// newsletter/FocusFeedNewsletter.js
const React = require("react");
const { Html, Head, Body, Container, Text, Img, Link, Section, Hr } = require("@react-email/components");

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=Focus+Feed";

// function FocusFeedNewsletter({ article }) {
//   const imageUrl = article.image?.startsWith("http") ? article.image : DEFAULT_IMAGE;
//   return (
//     React.createElement(Html, null,
//       React.createElement(Head, null),
//       React.createElement(Body, { style: { backgroundColor: "#000", color: "#fff", padding: "20px" } },
//         React.createElement(Container, null,
//           React.createElement(Text, { style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" } }, "FOCUS.FEED"),
//           React.createElement(Img, { src: imageUrl, alt: "Hero Image Here", width: 600, height: 300 }),
//           React.createElement(Text, { style: { fontSize: "24px", fontWeight: "bold" } }, article.title),
//           React.createElement(Text, null, article.summary),
//           React.createElement(Link, { href: article.link, style: { color: "#F51555", fontWeight: "bold" } }, "Read More →")
//         )
//       )
//     )
//   );
// }

// function FocusFeedNewsletter({  articles = [], firstName = "" }) {
//   return (
//     React.createElement(Html, null,
//       React.createElement(Head, null),
//       React.createElement(Body, {
//         style: {
//           backgroundColor: "#000",
//           color: "#fff",
//           padding: "20px",
//           fontFamily: "Arial, sans-serif",
//         },
//       },
//         React.createElement(Container, null,
//           // Header
//           // React.createElement(Text, {
//           //   style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" }
//           // }, "FOCUS.FEED"),
//           React.createElement(Text, {
//             style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" }
//           }, `FOCUS.FEED | Hello ${firstName}!`),
//         articles.map((article, i) => (
//           React.createElement(
//             Section,
//             { key: i, style: { marginBottom: "30px" } },
//             React.createElement(Text, {
//               style: { fontSize: "14px", color: "#aaa", marginBottom: "5px" }
//             }, article.sourceName),

//             React.createElement(Img, {
//               src: article.image,
//               alt: `Article ${i + 1} Image`,
//               width: 600,
//               height: 300,
//               style: { marginBottom: "10px" },
//             }),
//             React.createElement(Text, {
//               style: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }
//             }, article.title),
//             React.createElement(Text, {
//               style: { marginBottom: "10px", lineHeight: "1.5" }
//             }, article.summary),
//             React.createElement(Link, {
//               href: article.link,
//               style: { color: "#F51555", fontWeight: "bold" }
//             }, "Read More →")
//           )
//         ))
//       )

//       )
//     )
//   );
// }

function transformSummary(summary) {
  if (!summary) return null;

  // Split on newlines
  const lines = summary.split("\n");

  // We'll create an array of React elements (some bullets, some paragraphs).
  const elements = [];
  for (const [index, line] of lines.entries()) {
    let trimmed = line.trim();
    if (!trimmed) continue; // skip empty lines

    if (trimmed.startsWith("*")) {
      // Remove the leading "*" or "* "
      trimmed = trimmed.replace(/^\*\s*/, "");
      // Turn it into a bullet point
      elements.push(
        React.createElement(
          "li",
          { key: `bullet-${index}`, style: { marginBottom: "5px" } },
          trimmed
        )
      );
    } else {
      // Otherwise, just make it a paragraph
      elements.push(
        React.createElement(
          "p",
          { key: `para-${index}`, style: { marginBottom: "5px" } },
          trimmed
        )
      );
    }
  }

  // We’ll wrap all those items in a <ul> so bullet points display properly
  return React.createElement(
    "ul",
    { style: { marginLeft: "20px", paddingLeft: "10px" } },
    elements
  );
}

function FocusFeedNewsletter({ articles = [], firstName = "" }) {
  return React.createElement(
    Html,
    null,
    React.createElement(
      Head,
      null
    ),
    React.createElement(
      Body,
      {
        style: {
          backgroundColor: "#000",
          color: "#fff",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        },
      },
      React.createElement(
        Container,
        null,
        // Header text
        React.createElement(
          Text,
          {
            style: {
              fontSize: "28px",
              fontWeight: "bold",
              color: "#F51555",
              marginBottom: "30px",
            },
          },
          `FOCUS.FEED | Hello ${firstName}!`
        ),

        // Loop over articles
        ...articles.map((article, i) => {
          return React.createElement(
            Section,
            {
              key: i,
              style: {
                marginBottom: "30px",
                paddingBottom: "20px",
                borderBottom: "1px solid #333",
              },
            },
            // Source name
            React.createElement(
              Text,
              {
                style: {
                  fontSize: "14px",
                  color: "#aaa",
                  marginBottom: "5px",
                },
              },
              article.sourceName
            ),

            // Image
            React.createElement(Img, {
              src: article.image || DEFAULT_IMAGE,
              alt: `Article ${i + 1} Image`,
              width: 600,
              height: 300,
              style: { marginBottom: "10px", borderRadius: "4px" },
            }),

            // Title
            React.createElement(
              Text,
              {
                style: {
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                },
              },
              article.title
            ),

            // Summary
            React.createElement(
              "div",
              { style: { marginBottom: "10px", lineHeight: "1.5" } },
              transformSummary(article.summary)
            ),

            // "Read More" link
            React.createElement(
              Link,
              {
                href: article.link,
                style: { color: "#F51555", fontWeight: "bold" },
              },
              "Read More →"
            )
          );
        }),

        // Footer
        React.createElement(
          Section,
          { style: { marginTop: "30px", textAlign: "center" } },
          React.createElement(Hr, {
            style: { borderColor: "#333", marginBottom: "15px" },
          }),
          React.createElement(
            Text,
            { style: { fontSize: "12px", color: "#666" } },
            `© ${new Date().getFullYear()} Focus Feed. All rights reserved.`
          ),
          React.createElement(
            Text,
            { style: { fontSize: "12px", color: "#666" } },
            "You are receiving this email because you opted in to receive news ",
            "from Focus Feed. If you no longer wish to receive these emails, you may ",
            React.createElement(
              Link,
              { href: "https://focusfeed.org/preferences", style: { color: "#F51555" } },
              "manage your preferences"
            ),
            "."
          )
        )
      )
    )
  );
}

module.exports = FocusFeedNewsletter;
