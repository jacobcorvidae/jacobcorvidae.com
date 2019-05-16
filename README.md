# jacobcorvidae.com

## Commands

The following commands should be run within jacobcorvidae.com folder in the terminal (i.e. `cd somepath/jacobcorvidae.com`):

Setup:

```console
npm install
```

Development (watches for .md file content and template.scss changes. If adding or removing md files, need to kill command and restart.):

```console
npm start
```

Clean and start fresh:

```console
npm run clean
```

Generate .html files for release:

```console
npm run build
```

## Structure

```
/articles - Markdown source files
/docs - Generated html files
/src/cli.js - Generator
/src/template.js - AMP Html template
/src/template.scss - Custom CSS for template
```
