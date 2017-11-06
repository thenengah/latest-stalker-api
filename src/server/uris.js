export default {
  latest: (name) => `http://registry.npmjs.org/-/package/${name}/dist-tags`,
  repo: (name) => `https://www.npmjs.com/package/${name}`,
  file: (name) => `https://www.github.com/${name}`,
  raw: (name) => `https://www.github.com/${name}`.replace('blob', 'raw')
}
