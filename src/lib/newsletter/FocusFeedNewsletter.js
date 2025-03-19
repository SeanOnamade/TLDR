// newsletter/FocusFeedNewsletter.js
const React = require("react");
const { Html, Head, Body, Container, Text, Img, Link, Section } = require("@react-email/components");

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

function FocusFeedNewsletter({  articles = [], firstName = "" }) {
  return (
    React.createElement(Html, null,
      React.createElement(Head, null),
      React.createElement(Body, {
        style: {
          backgroundColor: "#000",
          color: "#fff",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        },
      },
        React.createElement(Container, null,
          // Header
          // React.createElement(Text, {
          //   style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" }
          // }, "FOCUS.FEED"),
          React.createElement(Text, {
            style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" }
          }, `FOCUS.FEED | Hello ${firstName}!`),

          // Map through the articles array
        //   articles.map((article, index) => (
        //     React.createElement(Section, { key: index, style: { marginBottom: "30px" } },
        //       React.createElement(Img, {
        //         src: article.image,
        //         alt: `Article ${index + 1} Image`,
        //         width: 600,
        //         height: 300,
        //         style: { marginBottom: "10px" }
        //       }),
        //       React.createElement(Text, {
        //         style: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }
        //       }, article.title),
        //       React.createElement(Text, {
        //         style: { marginBottom: "10px", lineHeight: "1.5" }
        //       }, article.summary),
        //       React.createElement(Link, {
        //         href: article.link,
        //         style: { color: "#F51555", fontWeight: "bold" }
        //       }, "Read More →")
        //     )
        //   ))
        // )
        articles.map((article, i) => (
          React.createElement(
            Section,
            { key: i, style: { marginBottom: "30px" } },
            React.createElement(Text, {
              style: { fontSize: "14px", color: "#aaa", marginBottom: "5px" }
            }, article.sourceName),

            React.createElement(Img, {
              src: article.image,
              alt: `Article ${i + 1} Image`,
              width: 600,
              height: 300,
              style: { marginBottom: "10px" },
            }),
            React.createElement(Text, {
              style: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }
            }, article.title),
            React.createElement(Text, {
              style: { marginBottom: "10px", lineHeight: "1.5" }
            }, article.summary),
            React.createElement(Link, {
              href: article.link,
              style: { color: "#F51555", fontWeight: "bold" }
            }, "Read More →")
          )
        ))
      )

      )
    )
  );
}

module.exports = FocusFeedNewsletter;
