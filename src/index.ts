import express, { Express, NextFunction, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'
import bodyParser from 'body-parser'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import tweetsRouter from '~/routes/tweets.routes'
import bookmarksRouter from '~/routes/bookmarks.routes'
import likesRouter from '~/routes/likes.routes'
import searchRouter from './routes/search.routes'
config()
// import '~/utils/fake'

const app: Express = express()
const port = process.env.PORT || 4000
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

app.use(cors())

initFolder()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/search', searchRouter)
app.use('/likes', likesRouter)

app.use('/static', staticRouter)
//app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
