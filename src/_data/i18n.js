const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const ROOT = path.join(__dirname, '../../resources/content')

function read(relPath) {
  return matter(fs.readFileSync(path.join(ROOT, relPath), 'utf8')).data.content
}
function raw(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8')
}

const langs = ['en', 'ja']
const pages = ['index', 'download', 'team', 'tos', '404']
const osParts = [
  'darwin_checksum', 'darwin_signature',
  'linux_checksum', 'linux_signature',
  'windows_checksum', 'windows_signature',
]

module.exports = Object.fromEntries(langs.map(lang => [lang, {
  global: read(`global/global-${lang}.md`),
  pages: Object.fromEntries(pages.map(p => [p, read(`pages/${p}/${p}-${lang}.md`)])),
  downloadInstructions: Object.fromEntries(
    osParts.map(part => [part, raw(`download/${part}.${lang}.md`)])
  ),
}]))
