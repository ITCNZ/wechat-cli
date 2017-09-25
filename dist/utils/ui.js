"use strict";

var UI = {
  toast: function toast(msg, type) {
    wx.showToast({
      title: msg,
      icon: type,
      duration: 2000
    });
  },

  laoding: function laoding() {}

};

module.exports = UI;
//# sourceMappingURL=ui.js.map
