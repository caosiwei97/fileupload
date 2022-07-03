import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const router = express.Router()

const a = 1 + 2
const b = a + 1

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options')
    res.send(200) //让options尝试请求快速结束
  else next()
})

router.get('/api/base', function (req: any, res: any) {
  res.json(req.query)
})

router.post('/api/base', function (req: any, res: any) {
  res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

export default app
