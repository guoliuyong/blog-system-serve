/*
 * @Author: your name
 * @Date: 2022-02-28 09:45:33
 * @LastEditTime: 2022-02-28 10:28:01
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog-system-serve\Routes\auth.js
 */
const db = require('../Model/model')
const express = require('express')
const auth = express.Router()
auth.get('/self', (req, res) => {
  const { username } = req.query
  const querySql = `SELECT username, userId,hobby,nickname,telphone,realname,picUrl FROM user_info WHERE username = "${username}"`
  db(querySql, (err, reuslt) => {
    if (err) return err
    res.status(200).json({
      ...reuslt[0],
    })
  })
})
module.exports = auth
