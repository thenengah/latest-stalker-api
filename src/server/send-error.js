export default (er, res, code=500) => {
  if (process.env.NODE_ENV !== 'test') console.log(er.stack)
  res.sendStatus(code)
}
