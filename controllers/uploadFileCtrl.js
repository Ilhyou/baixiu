const formidable = require('formidable')

module.exports = {
  uploadFile(req, res) {
    // 使用formidable接收上传过来的文件文件
    
    //1.创建对象
    let form = new formidable.IncomingForm()

    // 2.设置编码方式 因为formidable这个模块非常强大 不但可以处理上传过来的文件 还可以处理上传过来的json形式的字符串数据
    form.encoding = 'utf-8';

    //3.设置图片上传过来后的存储路径
    form.uploadDir = "./static/uploads";
    //当前的这个./不是以当前的控制器文件为参考点 而是以项目文件夹为参考

    // 4.是否奥柳上传文件的后缀  默认是false 
    form.keepExtensions = true;

    // 5.设置上传字段的大小 json形式的字符串
    form.maxFieldsSize = 20 * 1024 * 1024;

    // 6.设置上传文件的大小
    form.maxFields = 200 * 1024 * 1024;

    // 7.设置上传字段的对数
    form.maxFields = 1000;

    // 8. 调用parse方法对上传过来的数据进行处理
    form.parse(req,function (err,fields,files) {

      /**
       * 1. 上传过来的数据都在req这个对象里面
       * 2. parse方法会对req这个对象进行处理
       * 3.如果上传成功 err是一个null，否则是一个错误对象
       * 4.如果上传成功 fields里面存储的是上传过来的字符串数据
       * 5.如果上传成功files里面存储的是上传过来的文件数据
       * 
       */
      console.log(files);
      if(err) return res.json({
        "code":1,
        "msg":'上传失败'
      })

      res.json({
        "code":0,
        "msg":'上传成功',
        "src":files.avatar.path
      })
      
    })
  }
}