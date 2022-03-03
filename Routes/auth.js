/*
 * @Author: your name
 * @Date: 2022-02-28 09:45:33
 * @LastEditTime: 2022-03-03 20:17:04
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog-system-serve\Routes\auth.js
 */
const db = require('../Model/model')
const express = require('express')
const auth = express.Router()
const jsonToken = require('jsonwebtoken')
auth.get('/self', (req, res) => {
  const token = (req.headers.authorization || '').split(' ').pop()
  const { username } = jsonToken.decode(token)
  const querySql = `SELECT username, userId,hobby,nickname,telphone,email, sex,area,realname,picUrl FROM user_info WHERE username = "${username}"`
  db(querySql, (err, reuslt) => {
    if (err) {
      res.send({
        err,
      })
      return err
    }
    res.status(200).json({
      ...reuslt[0],
    })
  })
})
auth.get('/userlist', (req, response) => {
  const { pageSize, pageNum = 10 } = req.query
  const startIndex = (pageSize - 1) * pageNum
  const endIndex = Number(startIndex) + Number(pageNum)
  const querySql = `select * from user_info LIMIT ${startIndex}, ${pageNum}`
  db(querySql, (err, reuslt = []) => {
    const totalSql = `SELECT COUNT(*) AS total FROM user_info  `
    db(totalSql, (err, res) => {
      response.status(200).json({
        total: res[0].total,
        content: reuslt.map((d) => {
          const item = d
          delete item.password
          return item
        }),
      })
    })
  })
})
auth.post('/update/userlist', (req, res) => {
  const { userId, telphone, nickname, email, realname, hobby,sex ,area} = req.body;
  const updateSql = `
   UPDATE user_info SET
   telphone = '${telphone ? telphone : null}',
   nickname = '${nickname}', 
   email = '${email}', 
   realname = '${realname}', 
   hobby = '${hobby}',
   sex = '${sex}',
   area = '${area}'
   WHERE userId = ${userId}`;
  db(updateSql, (err, reuslt) => {
    console.log(err);
    if (reuslt.affectedRows === 1) {
      res.status(200).json({
        ...req.body,
      })
    }
  })
})
module.exports = auth
