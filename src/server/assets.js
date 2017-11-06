import fs from 'fs'

const assets = Object.assign(
  require('../../bundle/app-assets.json'),
  require('../../bundle/vendor-assets.json')
)

const style = fs.readFileSync(`./bundle/${assets.website.css}`)

export default {
  ...assets,
  style
}


