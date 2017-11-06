import './normalize.css'
import './default.scss'

import dependency from './dependency.scss'
import header from './header.scss'
import form from './form.scss'
import upload from './upload.scss'
import utility from './utility.scss'

const styles = {
  dependency,
  form,
  header,
  upload,
  utility 
}

export default (pairs) => {
  return pairs.split(',').map(pair => {
    const [file, key] = pair.trim().split(':')
    return styles[file][key]
  }).join(' ')
}
