/*
 * @Author: your name
 * @Date: 2022-02-22 16:23:39
 * @LastEditTime: 2022-02-22 16:28:21
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog_backStageSystem\blog_serve\Routes\article.js
 */
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../Model/model'))
const article = express.Router();
article.get("/article/list", (req,res)=>{
    const querySql = "SELECT * from article_list";
    db(querySql,(err, result)=>{
      res.send({
          content: result
      })
    })
})
module.exports = article;