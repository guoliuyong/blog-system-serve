/*
 * @Author: your name
 * @Date: 2022-02-08 16:57:03
 * @LastEditTime: 2022-03-07 20:53:59
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog_backStageSystem\blog_serve\app.js
 */
const express = require('express')
const app = express()
const path = require('path')
const router = require(path.join(__dirname, 'Routes/user.js'))
const article = require(path.join(__dirname, 'Routes/article.js'))
const auth = require(path.join(__dirname, 'Routes/auth.js'))
app.use(express.static('public'))
var cors = require('cors')
app.use(cors())
const expressToekn = require('express-jwt')
app.use(
  expressToekn({ secret: 'hand', algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  }),
)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message:"token已过期或不合法"
  })
  }
})
app.use(express.json())
app.use('/api', router);
app.use('/v1', article);
app.use('/v1', auth);
app.listen('5000', () => {})
