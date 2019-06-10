const conn = require('./baseDB')

module.exports = {
  getCommentsDataByPage(currentPage, callback) {
    // 1. 准备SQL语句
    let pageSize = 10 // 表示每页显示的数据量
    let offset = (currentPage - 1) * pageSize
    // let sql = 'select * from comments order by id desc limit ? offset ?;select count(*) as totalCount from comments';
    let sql = 'select c.id,c.author,c.content,c.created,c.status,p.title from comments as c left join posts as p on c.post_id=p.id order by id desc limit ? offset ?;select count(*) as totalCount from comments';

    conn.query(sql, [pageSize, offset], (err, results) => {
      if (err) return callback(err)

      // if(results.af){
      callback(null, results)
      // }
    })
  },
  delCommentsById(id, callback) {
    const sql = 'delete from comments where id=?'
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
  approvedCommentsById(id,status,callback){
    const sql = 'update comments set status = ? where id =?'
    // 2. 调用方法更新数据
    conn.query(sql,[status,id],(err,results)=>{
      if(err) return callback(err)

      callback(null,results)
    })
  }
}