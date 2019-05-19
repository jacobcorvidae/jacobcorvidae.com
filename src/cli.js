const sass = require("sass");
const liveServer = require("live-server");
const path = require("path");
const marked = require("marked");
const fs = require("fs");
const { execSync } = require("child_process");
const articlesPath = path.join(__dirname, "..", "articles");
const docsPath = path.join(__dirname, "..", "docs");

const getArticle = file => {
  const source = fs.readFileSync(path.join(articlesPath, file), "utf8");
  const metadata = { title: file, image: "", date: new Date(), tags: [], genre: "" };
  let tokens = marked.lexer(source);

  if (tokens && tokens[0].type === "code" && tokens[0].lang === "metadata") {
    const token = tokens[0];
    tokens.splice(0, 1);
    try {
      const meta = JSON.parse(token.text);
      for (const m in meta) {
        if (!(m in metadata)) continue;
        metadata[m] = m === "date" ? new Date(meta[m]) : meta[m];
      }
    } catch (e) {
      throw new Error("Invalid metadata format for: " + file + "; " + e);
    }
  }

  return {
    file,
    html: marked.parser(tokens),
    metadata,
  };
};

const getArticles = () => /* : [{file, title, html, modified}] */ {
  const articleFiles = fs.readdirSync(articlesPath);
  return articleFiles.map(file => getArticle(file));
};

const getCustomStyle = () => `${sass.renderSync({ file: path.join(__dirname, "template.scss") }).css}`;

const clean = () => execSync(`rm -fr ${docsPath}/*.html`);

const generateFile = ({ article, articles, style }) => {
  const template = require("./template");
  const htmlPath = path.join(docsPath, article.file.replace(".md", ".html"));
  const html = template({ ...article, articles, style });
  fs.writeFileSync(htmlPath, html);
};

const generate = () => {
  const articles = getArticles();
  const style = getCustomStyle();

  articles.forEach(article => generateFile({ article, articles, style }));

  return { articles, style };
};

// Watch
if (process.argv.indexOf("--watch") > 0) {
  clean();

  const { articles, style } = generate();

  articles.forEach(article => {
    fs.watch(path.join(articlesPath, article.file), () => {
      console.log("File change detected", article.file);
      generateFile({ article: getArticle(article.file), articles, style });
    });
  });

  fs.watch(path.join(__dirname), () => {
    console.log("src file changed");
    generate();
  });

  liveServer.start({
    root: docsPath,
    open: true, // When false, it won't load your browser by default.
    wait: 1000,
    watch: [docsPath],
  });
} else if (process.argv.indexOf("--clean") > 0) {
  clean();
} else {
  clean();
  generate();
}
