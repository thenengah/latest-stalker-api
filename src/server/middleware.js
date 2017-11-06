import sendError from './send-error'
import Dependency from './models/dependency'

const parseUpload = async(req, res, next) => {
  try {
    req.upload = JSON.parse(req.file.buffer.toString())
    next()
  } catch (er) { sendError(er, res, 400) }
}

const validateUpload = async(req, res, next) => {
  if (+req.headers['content-length'] > 1048576) {
    sendError(new Error('file to big'), res, 400)
  } else {
    next()
  }
}


export {
  parseUpload,
  validateUpload
}
