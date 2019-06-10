const conn = require('./baseDB')
const ctgModel = require('./ctgModel')

module.exports = {
  // getAllPostsData(callback) {
  //   const sql = `SELECT posts.*, users.nickname, categories.name
  //       FROM posts
  //       INNER JOIN users ON posts.user_id = users.id
  //       INNER JOIN categories ON posts.category_id = categories.id
  //       ORDER BY id LIMIT ${data.pageCount} offset ${(data.pageSize - 1)*data.pageCount}`;
  //   conn.query(sql, (err, results) => {
  //     if (err) return callback(err)

  //     callback(null, results)
  //   })
  // },
  // getAllData(callback) {
  //   const sql = 'SELECT * from posts'
  //   conn.query(sql, (err, results) => {
  //     if (err) return callback(err)

  //     callback(null, results)
  //   })
  // },

  getCategoriesData(callback) {
    ctgModel.getCtgData((err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  addPost(post, callback) {
    var sql = 'insert into posts set ?';
    conn.query(sql, [post], (err, results) => {
      if (err) callback(err)

      callback(null)
    })
  },

  // 获取所有文章页面中的真正所有的数据
  getAllPostsData(currentPage, callback) {
    // 1. 准备sql语句
    //  let sql = "select * from posts"
    let pageCount = 10 // 表示每页显示的条数
    // let currentPage = 1
    let offset = (currentPage - 1) * pageCount // 表示起始的索引
    //  let sql = `select p.id,p.slug,p.title,p.status,p.created,u.nickname,c.name from posts as p LEFT JOIN users as u on p.user_id = u.id LEFT JOIN categories as c on p.category_id = c.id ORDER BY id desc limit 10 offset 0;select count(*) as totalCount from posts;`

    let sql = `select p.id,p.slug,p.title,p.status,p.created,u.nickname,c.name from posts as p LEFT JOIN users as u on p.user_id = u.id LEFT JOIN categories as c on p.category_id = c.id ORDER BY id desc limit ${pageCount} offset ${offset};select count(*) as totalCount from posts;`

    // 2. 调用方法查询数据
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      // console.log(results); // 如果一次性执行了多条SQL语句,则results仍然是一个数组,数组里面存储着查询到的数据值
      //  return;
      callback(null, results)
    })
  },

  //删除文章
  delPostsById(id, callback) {
    const sql = 'delete from posts where id = ?'

    conn.query(sql, id, (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },

  // 根据id来获取当前的文章数据
  getPostsDataById(id, callback) {
    let sql = 'select * from posts where id = ?;select * from categories'

    conn.query(sql, id, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  // 更新文章
  updatePosts(post, callback) {
    let id = post.id;
    delete post.id;
    let sql = 'update posts set ? where id = ?'

    conn.query(sql, [post, id], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  }
}