//index.js
//获取应用实例
var API = require('../../api/api.js');

const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },


  onLaunch: function (options) {
    console.log('onLaunch....')
  
  },
  onShow: function (options) {
    console.log('onShow....')
  },
  onHide: function () {
    console.log('onHide....')
  },
  onError: function (msg) {
    console.log(msg)
  },
  onReady: function () {
    console.log('onReady....')
    console.log('api', API)
    API.Banner.getBanners({
       q: "语文",
       start: 0,
       count: 20
    })
      .then((res) => {
        console.log(res)
      });
  },





})