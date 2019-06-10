// 1. 引入mysql模块
const mysql = require('mysql')

// 2. 创建连接对象
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'baixiu32',
  dateStrings: true, // 将数据库中的时间以字符串的类型来读取并返回,不要改成javascript Date类型
  multipleStatements: true //  允许query方法一次性使用多条SQL语句 

})

// 3. 连接数据库
conn.connect();

// 4. 向外暴露连接对象
module.exports = conn