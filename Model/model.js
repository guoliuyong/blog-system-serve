/*
 * @Author: your name
 * @Date: 2022-02-08 17:16:42
 * @LastEditTime: 2022-02-21 21:19:51
 * @LastEditors: LAPTOP-L472H14P
 * @Description: In User Settings Edit
 * @FilePath: \blog_backStageSystem\blog_serve\Model\model.js
 */
const mysql = require("mysql");
// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     port: "3306",
//     user: "root",
//     password: "123456",
//     database:"blog_db"
// });
// db.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });
// db.end(function(err) {
//     if (err) {
//       return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
//   });
const pool = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456",
    database:"blog_db"
});

const db = function(sql,options,callback){

    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,options,function(err,results,fields){
                //事件驱动回调
                callback(err,results,fields);
            });
            //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
            conn.release();
        }
    });
};

module.exports = db;