const conn = require('./baseDB');
module.exports = {
  getUsersData(callback) {
    // var sql = 'select * from users';
    var sql = 'select * from users where isDel = 0';
    conn.query(sql, (err, retults) => {
      if (err) return callback(err);

      callback(null, retults)
    })
  },
  addUser(user, callback) {
    var sql = 'insert into users set ?';
    conn.query(sql, user, (err, results) => {
      if (err) callback(err)

      callback(null)
    })
  },
  delUser(id, callback) {
    // var sql = 'delete from users where id =?'
    var sql = 'update users set isDel = 1 where id =?'
    conn.query(sql, id, (err, results) => {
      if (err) return callback(err);
      callback(null)
    })
  },
  getUserById(id, callback) {
    var sql = 'select * from users where id=?';
    conn.query(sql, id, (err, results) => {
      if (err) return callback(err);

      callback(null, results)
    })
  },
  updateUser(user, callback) {
    var id = user.id;
    delete user.id;
    var sql = 'update users set ? where id = ?';
    conn.query(sql, [user, id], (err, results) => {
      if (err) return callback(err);

      callback(null)
    })
  },
  delMoreUsers(ids, callback) {

    // let sql = `update users set isDel = 1 where id in (${ids.join()})`
    // conn.query(sql,(err,results)=>{
    //   // console.log(err.message);
    //   if(err) return callback(err)

    //   callback(null)
    // })

    // 使用参数化的方式来批量删除
    let sql = "update users set isDel = 1 where id in (?)"
    conn.query(sql, [ids], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },


  //个人中心更新数据
  updateProfileInfo(profile, callback) {
    let id = profile.id;

    delete profile.id;

    let sql = "update users set ? where id = ?"
    conn.query(sql, [profile, id], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },
  //验证密码
  validateOldPasswordById(id, callback) {
    const sql = 'select * from users where id=?'
    conn.query(sql, id, (err, results) => {
      if (err) callback(err)

      callback(null, results)
    })
  },
  //更新密码
  updateProfilePassword(obj, callback) {
    // { password: '111', id: '36' }

    let {
      password,
      id
    } = obj;
     let sql = "update users set password = ? where id = ?"
     conn.query(sql,[password,id],(err,results)=>{
       if(err) return callback(err)
       callback(null)
     })
  }
}