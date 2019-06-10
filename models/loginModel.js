const conn = require('./baseDB');
module.exports = {
  login(user, callback) {
    let {
      email,
      password
    } = user;

    var sql = 'select * from users where email = ? and password = ?'
    conn.query(sql, [email, password], (err, results) => {
      if (err) return callback(err)

      callback(null, results) // 把查到的结果返回给控制器，让控制器根据结果自己写业务逻辑
      /**
       * 1.如果SQL语句是错的,则err是一个错误对象,results是undefined
       * 2.如果SQL语句语法是正确的,则query会正常的执行这个sql语句
       * 3.但是此SQL语句中的email和password是错误的,则err是一个null,results是一个[]
       * 4.如果SQL语句中的email值是正确的,password是错误的,此时err是一个null,results是一个[]
       * 5.只有email和password都正确的情况下,results才是一个有真正数据对象的数组
       */
    })
  }
}