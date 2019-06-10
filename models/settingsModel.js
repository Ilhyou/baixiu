const conn = require('./baseDB');

module.exports = {
  getNavMenusData(callback) {
    let sql = "select `value` from options where `key` = 'nav_menus'"

    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  addNewNavMenus(nav, callback) {
    this.getNavMenusData((err, results) => {
      if (err) return callback(err);

      let arr = JSON.parse(results[0]['value'])
      arr.push(nav);
      // let str = JSON.stringify(arr);

      // let sql = "update options set `value` = ? where `key` = 'nav_menus'";
      // conn.query(sql, str, (err, results) => {
      //   if (err) return callback(err)

      //   callback(null)
      // })

      this.updateInfoByParams(arr,'nav_menus',callback)

    })
  },
  delNavMenusByIndex(index, callback) {
    this.getNavMenusData((err, results) => {
      if (err) return callback(err)

      let arr = JSON.parse(results[0]['value'])

      arr.some((item, idx) => {
        if (idx == index) {
          arr.splice(index, 1);
          return true;
        }
      })
      // let str = JSON.stringify(arr);

      // let sql = "update options set `value` = ? where `key` = 'nav_menus'";

      // conn.query(sql, str, (err, results) => {
      //   if (err) callback(err)

      //   callback(null)
      // })
      this.updateInfoByParams(arr,'nav_menus',callback)
      
    })
  },
  delMoreNavMenus(idxs, callback) {
    console.log(idxs);
    this.getNavMenusData((err, results) => {
      if (err) return callback(err)

      let arr = JSON.parse(results[0]['value'])

      let newIndexArr = idxs.map((val, idx) => {
        return parseInt(val) - idx;
      })
      console.log(newIndexArr);
      newIndexArr.forEach(function (item, index) {
        arr.splice(item, 1)
      })

      // console.log(arr);
      // let str = JSON.stringify(arr);
      // let sql = "update options set `value` = ? where `key` = 'nav_menus'";

      // conn.query(sql, str, (err, results) => {
      //   if (err) callback(err)

      //   callback(null)
      // })

      this.updateInfoByParams(arr,'nav_menus',callback)

    })
  },

  getSlidesData(callback) {
    let sql = "select `value` from options where `key` = 'home_slides'"
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  addNewSlides(slides, callback) {
    this.getSlidesData((err, results) => {
      if (err) return callback(err)

      let arr = JSON.parse(results[0]['value'])
      arr.push(slides)

      // 转换成字符串
      // let str = JSON.stringify(arr)
      // // 1. 准备SQL语句
      // let sql = "update options set `value` = ? where `key` = 'home_slides';"
      // // 2. 调用方法进行添加
      // conn.query(sql, [str], (err, results) => {
      //   if (err) return callback(err)

      //   callback(null, results)
      // })

      this.updateInfoByParams(arr,'home_slides',callback)
    })
  },
  delSlides(index, callback) {
    this.getSlidesData((err, results) => {
      if (err) return callback(err)

      var arr = JSON.parse(results[0]['value']);
      arr.some((item, idx) => {
        if (idx == index) {
          arr.splice(index, 1);
          return true;
        }
      })
      // let str = JSON.stringify(arr);
      // let sql = "update options set `value` = ? where `key` = 'home_slides'";
      // conn.query(sql, str, (err, results) => {
      //   if (err) return callback(err)

      //   callback(null)
      // })
      this.updateInfoByParams(arr,'home_slides',callback)
    })
  },
  updateInfoByParams(arr, key, callback) {
    let str = JSON.stringify(arr);
    let sql = "update options set `value` = ? where `key` = ?";
    conn.query(sql, [str, key], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },

  getSettingsData(callback) {
    // 1. 准备SQL语句
    let sql = 'select * from options where id < 9'

    // 2.调用方法获取数据
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  updateSettings(obj, callback) {
    let sql = ''
    for (let key in obj) {
      if (key == 'site_logo') {
        obj[key] = obj[key].replace(/\\/g, '/')
      }
      sql += 'update options set `value` = "' + obj[key] + '" where `key` = "' + key + '";'
    }
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  }
}