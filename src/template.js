"use strict";

module.exports = ({ html, file, style, metadata, articles }) => `<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>${metadata.title} - Jacob Corvidae</title>
    <link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "Article",
        "author": "Jacob Corvidae",
        "headline": "${metadata.title}"
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>${style}</style>
  </head>
  <body>
    <header>
      Jacob Corvidae — Stories
    </header>
    <article>
      ${metadata.image &&
        `<amp-img src="${metadata.image}"
        height="720"
        layout="fixed-height"></amp-img>`}
      ${html}
    </article>
    <nav>
      <p>Hi, I’m <a href="/">Jacob</a>, an instructor pilot for the USAF's Initial Flight Training program. I write short fiction and a lot of my stories are inspred by experiences had while overflying the landscape of Southern Colorado. Some stories are just regular, too. If you've enjoyed reading then <a href="/">reach out</a>, I'd love to hear from you.</p>
      ${Object.entries(
        articles
          .filter(article => !(article.file === file || !article.metadata.genre))
          .reduce((genres, article) => {
            const genre = article.metadata.genre || "Unknown";
            if (!(genre in genres)) genres[genre] = [];
            genres[genre].push(article);
            return genres;
          }, {})
      )
        .map(
          ([genre, articles]) =>
            `<div class="nav-genre">${genre}</div>` +
            articles
              .map(
                ({ file, metadata }) => `<li>
          <a href="/${file.replace(".md", ".html")}">
            <span class="nav-title">${metadata.title}</span>
            <span class="nav-spacer"></span>
            <span class="nav-tags">${metadata.tags.join(", ")}</span>
          </a></li>`
              )
              .join("\n")
        )
        .join("\n")}
    </nav>
    <footer>
      <a href="/about.html">about</a>
      <a href="/contact.html">connect</a>
      <a href="/">medium</a>
    </footer>
  </body>
</html>`;
