const matter = require('gray-matter')
const md = require('markdown-it')({ html: true })

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'static': '.' })
  // Copy only the unique files from resources/images (static-medusa.jpg already comes from static/)
  for (const f of ['darwin.svg', 'linux.svg', 'windows.svg', 'icon.png', 'spinner.svg']) {
    eleventyConfig.addPassthroughCopy({ [`resources/images/${f}`]: `images/${f}` })
  }
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' })

  eleventyConfig.addFilter('markdown', (str) => md.render(str || ''))
  eleventyConfig.addFilter('langUrl', (url, lang) =>
    lang === 'ja' ? `/ja${url}` : url
  )

  eleventyConfig.setServerOptions({ port: 8080 })

  return {
    pathPrefix: process.env.PATH_PREFIX || '/',
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    templateFormats: ['njk', 'html'],
    htmlTemplateEngine: 'njk',
  }
}
