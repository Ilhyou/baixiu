const conn = require('./baseDB')

module.exports = {
  getIndexPageData(callback) {
    // 1. 准备SQL语句
    let sql = `select count(*) as postsCount from posts;
     select count(*) as draftedCount from posts where status='drafted';
     select count(*) as categoriesCount from categories;
     select count(*) as commentsCount from comments;
     select count(*) as heldCount from comments where status = 'held';
    `
    // 2.调用方法来查询数据
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  }
}