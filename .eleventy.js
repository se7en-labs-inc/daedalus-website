const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
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
  // Short content hash of a file under src/, used as a cache-busting query
  // value so a changed asset always gets a URL no browser has stored.
  eleventyConfig.addFilter('assetHash', (url) =>
    crypto
      .createHash('sha256')
      .update(fs.readFileSync(path.join('src', url)))
      .digest('hex')
      .slice(0, 10)
  )
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
