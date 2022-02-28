const express = require('express')
const path = require('path')
const model = require(path.join(__dirname, '../Model/model'))
const router = express.Router()
const bcryptjs = require('bcryptjs')
const db = require('../Model/model');
const jsonToken = require('jsonwebtoken');
/**
 * @description: 登录接口
 * @param {*} 用户名，密码`
 * @return {*}
 */
router.get('/login', (req, res, err) => {
  const { username, password } = req.query
  const querySql = `SELECT * from user_info where username ="${username}"`
  db(querySql, (err, result) => {
    if (err) return err
    if (result.length === 0) {
      res.send({
        message: '用户不存在',
        failed: true,
      })
    } else {
      const sqlPsd = result[0].password
      const psd = bcryptjs.compareSync(password, sqlPsd)
      if (psd) {
        const secret = 'hand'
        // 3.生成token字符串
        const token = jsonToken.sign({ username: req.body.username, age: 30 }, secret, {
        expiresIn: '30h',
         })
        res.send({
          message: '登录成功',
          token,
          failed: false,
        })
      } else {
        res.send({
          message: '用户名密码不一致',
          failed: true,
        })
      }
    }
  })
})
/**
 * @description: 注册接口
 * @param {*} 用户名，密码
 * @return {*}
 */
router.post('/register', (req, res) => {
  const { username, password } = req.body
  const querySql = `SELECT * from user_info where username ="${username}"`
  db(querySql,(err, result) => {
    if (err) {
      res.send(err)
    }
    if (result.length !== 0) {
      res.send({
        message: '用户名已存在',
        failed: true,
      })
    } else {
      const hasPwd = bcryptjs.hashSync(password, 10)
      const resgistSql = `INSERT INTO user_info (username, password) VALUES ('${username}','${hasPwd}')`
      db(resgistSql, (err, result) => {
          if (err) {
            res.send(err)
          }
          if (result.affectedRows === 1) {
            res.send({
              failed: false,
              message: '注册成功',
            })
          }
        })
    }
  })
})

module.exports = router
