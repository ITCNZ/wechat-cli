"use strict";

var _require = require('../utils/util.js'),
    Net = _require.Net,
    Config = _require.Config;

module.exports = {

  /**
   * 获取顶部轮播图
   */
  getBanners: function getBanners(data) {
    return Net.getRequest("https://api.douban.com/v2/book/search", data);
  }

};
//# sourceMappingURL=banner.js.map
