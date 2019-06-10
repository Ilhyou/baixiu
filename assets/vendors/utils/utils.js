/**
 * 1.此文件是用来封装公用的一些方法
 * 2.这些方法与当前的项目没有直接业务关系
 * 3.这个公共的方法不但在此项目中可以使用,在任何项目当中都可以使用
 */

var utils = {
  convertToObj:function (str) {
    var arr = str.split('&');

    var obj = {}
    arr.forEach(function (item, index) {
        var temp = item.split('=')
        obj[temp[0]] = temp[1]
    });

    return obj;
  }
}