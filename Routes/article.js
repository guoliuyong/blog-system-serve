/*
 * @Author: your name
 * @Date: 2022-02-22 16:23:39
 * @LastEditTime: 2022-03-14 20:25:12
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog_backStageSystem\blog_serve\Routes\article.js
 */
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../Model/model'))
const article = express.Router()
article.get('/article/list', (req, res) => {
  let querySql = 'SELECT * from article_list Where 1=1'
  let { articleName, category, creationDate } = req.query
  if (articleName) {
    querySql += ` and articleName like "%${articleName}%"`
  }
  if (category) {
    querySql += ` and category like "%${category}%"`
  }
  if (creationDate) {
    querySql += ` and creationDate BETWEEN "${creationDate} 00:00:00" AND "${creationDate} 23:59:59"`
  }
  console.log(querySql)
  db(querySql, (err, result) => {
    res.send({
      content: result,
    })
  })
})
article.get('/article/category', (req, res) => {
  let querySql = 'SELECT * from article_category Where 1=1'
  db(querySql, (err, result) => {
    // if (result.content.length !== 0) {
    //   result.content.map((item) => {
    //     let conutSql = 
    //   })
    // }
    res.send({
      content: result,
    })
  })
})
module.exports = article
