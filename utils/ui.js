var UI = {
    toast: function(msg, type) {
      wx.showToast({
        title: msg,
        icon: type,
        duration: 2000
      })
    },

    laoding: function() {

    }

};


module.exports = UI;