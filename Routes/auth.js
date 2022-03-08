/*
 * @Author: your name
 * @Date: 2022-02-28 09:45:33
 * @LastEditTime: 2022-03-07 21:43:25
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog-system-serve\Routes\auth.js
 */
const db = require('../Model/model')
const express = require('express')
const auth = express.Router()
const jsonToken = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const file = require('fs')
const uploadConfig = multer({
  dest: path.join(__dirname, '../', 'public'),
})
const publicPath = path.join(__dirname, '../', 'public')
auth.post('/uploadHead', uploadConfig.single('avatar'), (req, res) => {
  const { userId } = req.body
  file.rename(
    req.file.path,
    `${publicPath}/${req.file.originalname}`,
    (err) => {
      if (err) throw err
      else {
        // 文件存储成功
        const querySql = `select * from user_info WHERE userId = '${userId}'`
        db(querySql, (err, result)=>{
          if (result[0].picUrl) {
            console.log(1123);
            // 代表已经有图片
            const updateSql = `UPDATE user_info set picUrl = 'http://localhost:5000/${req.file.originalname}' WHERE userId = '${userId}'`;
            db(updateSql, (err,req) =>{
              console.log(err);
              res.status(200).send({
                data: "上传成功"
              })
            })
          }else {
            console.log(123);
          }
          // console.log(result);
        })
      }
    },
  )
  // const insertSql = ``
  // console.log(req.file);
})

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
  const {
    userId,
    telphone,
    nickname,
    email,
    realname,
    hobby,
    sex,
    area,
  } = req.body
  const updateSql = `
   UPDATE user_info SET
   telphone = '${telphone ? telphone : null}',
   nickname = '${nickname}', 
   email = '${email}', 
   realname = '${realname}', 
   hobby = '${hobby}',
   sex = '${sex}',
   area = '${area}'
   WHERE userId = ${userId}`
  db(updateSql, (err, reuslt) => {
    console.log(err)
    if (reuslt.affectedRows === 1) {
      res.status(200).json({
        ...req.body,
      })
    }
  })
})
module.exports = auth
