//logs.js
const { Filter } = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return Filter.formatTime(new Date(log))
      })
    })
  }
})
