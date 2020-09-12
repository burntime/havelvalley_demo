const fs = require('fs');
const sass = require('node-sass');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginEmbedYouTube = require("eleventy-plugin-youtube-embed");

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
