import http from 'http'
import multer from 'multer'
import express from 'express'
import compression from 'compression'
import { createStore } from 'redux'

import sendError from './send-error'
import { validateUpload, parseUpload } from './middleware'
import { Latest, Upload } from './models'

import App from '../shared/components/app'
import assets from './assets'
import reducer from '../shared/reducer'
import provider from '../shared/provider'

const app = express()
const server = http.createServer(app)
const upload = multer({ storage:  multer.memoryStorage() })

app.set('view engine', 'ejs')
app.set('views', __dirname)
app.use(compression());
app.use(express.static(__dirname + '/../../bundle', { maxAge: 31536000000 }))

app.get('/', async(req, res) => {
  try {
    const store = createStore(reducer, {})
    const html = provider(req.url, store, App)
    const state = JSON.stringify(store.getState())
    res.render('view', { assets, html, state })
  } catch (er) { sendError(er, res) }
})

app.get('/api/latest/:name', async(req, res) => {
  try {
    res.send(await new Latest(req.params.name).get())
  } catch (er) { sendError(er, res) }
})

app.post('/api/stalk', validateUpload, upload.single('file'), parseUpload, async(req, res) => {
  try {
    res.send(await new Upload(req.upload).get())
  } catch (er) { sendError(er, res) }
});

export default {
  start: async(port, host) => new Promise(resolve => server.listen(port, host, resolve)),
  stop: async() => new Promise(resolve => server.close(resolve))
}
