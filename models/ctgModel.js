const conn = require('./baseDB');

module.exports = {
  getCtgData(callback){
    var sql = 'select * from categories where isDel = 0';
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)

      callback(null,results)
    })
  },
  addCtg(ctg,callback){
    var sql = 'insert into categories set ?'
    conn.query(sql,ctg,(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
  delCtg(id,callback){
    var sql = 'update categories set isDel = 1 where id = ?'
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
  getCtgById(id,callback){
    var sql = 'select * from categories where id =?'
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)

      callback(null,results)
    })
  },
  updateCtg(ctg,callback){
    console.log(ctg);
    var id = ctg.id;
    delete ctg.id;
    var sql = 'update categories set ? where id = ?';
    conn.query(sql, [ctg, id], (err, results) => {
      if (err) return callback(err);

      callback(null)
    })
  },
  delMoreCtgs(ids,callback){

    var sql = 'update categories set isDel = 1 where id in(?)';
    conn.query(sql,[ids],(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  }
}