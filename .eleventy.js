require('dotenv').config();

const fs = require('fs');
const sass = require('node-sass');
const htmlmin = require('html-minifier');
const MarkdownIt = require("markdown-it");
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginEmbedYouTube = require("eleventy-plugin-youtube-embed");

const mdRender = new MarkdownIt();

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginEmbedYouTube);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');

  eleventyConfig.addShortcode('includeScss', (filePath) => {
    const path = `css/${filePath}`;
    const result = sass.renderSync({
      file: `${path}.scss`,
      outputStyle: 'compressed'
    }).css;
    fs.writeFileSync(`_site/${path}.css`, result);

    return `/${path}.css`;
  });

  eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
    return mdRender.render(rawString);
  });

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
      if (!outputPath.endsWith(".html")) {
          return content;
      }

      return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeRedundantAttributes: true,
          sortAttributes: true,
          sortClassName: true,
      });
  });

  return {
    templateFormats: [
      'njk',
      'html',
    ],

    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};
