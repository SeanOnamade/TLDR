// newsletter/FocusFeedNewsletter.js
const React = require("react");
const { Html, Head, Body, Container, Text, Img, Link } = require("@react-email/components");

function FocusFeedNewsletter({ article }) {
  return (
    React.createElement(Html, null,
      React.createElement(Head, null),
      React.createElement(Body, { style: { backgroundColor: "#000", color: "#fff", padding: "20px" } },
        React.createElement(Container, null,
          React.createElement(Text, { style: { fontSize: "28px", fontWeight: "bold", color: "#F51555" } }, "FOCUS.FEED"),
          React.createElement(Img, { src: article.image, alt: "Hero Image Here", width: 600, height: 300 }),
          React.createElement(Text, { style: { fontSize: "24px", fontWeight: "bold" } }, article.title),
          React.createElement(Text, null, article.summary),
          React.createElement(Link, { href: article.link, style: { color: "#F51555", fontWeight: "bold" } }, "Read More →")
        )
      )
    )
  );
}

module.exports = FocusFeedNewsletter;
