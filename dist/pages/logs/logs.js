'use strict';

//logs.js
var _require = require('../../utils/util.js'),
    Filter = _require.Filter;

Page({
  data: {
    logs: []
  },
  onLoad: function onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return Filter.formatTime(new Date(log));
      })
    });
  }
});
//# sourceMappingURL=logs.js.map
