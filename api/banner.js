var {Net, Config} = require('../utils/util.js');


module.exports = {

  /**
   * 获取顶部轮播图
   */
  getBanners: function(data) {
    return Net.getRequest("https://api.douban.com/v2/book/search", data);
  }



}