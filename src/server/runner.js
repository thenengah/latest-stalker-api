import server from './index'
import worker from './worker'

const { PORT, HOST, WORK } = process.env

server.start(PORT, HOST) 
if (WORK) worker.work()
