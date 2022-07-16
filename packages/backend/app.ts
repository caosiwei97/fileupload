import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const router = express.Router()

// 使用body-parser中间件
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/api/user', function (req: any, res: any) {
  res.json({
    username: 'admin',
    age: 18,
  })
})

router.post('/api/user', function (req: any, res: any) {
  res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

export default app
