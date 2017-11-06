import fetch from 'isomorphic-fetch'

export default async({uri, json}) => {
  return new Promise((resolve, reject) =>
    fetch(uri).then(res => {
      if (res.status === 200) {
        json ? res.json().then(resolve) : res.text().then(resolve)
      } else {
        reject(new Error(`failed to get ${uri}`))
      }
    })
  )
}
