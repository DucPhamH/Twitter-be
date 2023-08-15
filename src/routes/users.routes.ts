import express from 'express'

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.send('hello user')
})

export default usersRouter
