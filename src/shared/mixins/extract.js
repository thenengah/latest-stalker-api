const GROUPS = [
  'dependencies',
  'devDependencies',
  'sharedDependencies',
  'peerDependencies'
]

export default (file) => {
  return GROUPS.reduce((dependencies, type) => {
    Object.keys(file[type] || []).forEach(name => {
      const parts = file[type][name].split('/')
      const version = parts[parts.length-1] 
      dependencies.push({ type, name, version })
    })
    return dependencies
  }, [])
}
