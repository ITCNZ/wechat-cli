'use strict';

var Promise = require('./promise');

function wxPromisify(fn) {
  return function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
      obj.success = function (res) {
        //成功
        resolve(res);
      };
      obj.fail = function (res) {
        //失败
        reject(res);
      };
      fn(obj);
    });
  };
}

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  var P = this.constructor;
  return this.then(function (value) {
    return P.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return P.resolve(callback()).then(function () {
      throw reason;
    });
  });
};

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request);
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'json'
    }
  });
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request);
  var postBody = {
    "style": "",
    "clientInfo": {
      "clientType": "web"
    },
    "data": data
  };
  return postRequest({
    url: url,
    method: 'POST',
    data: postBody,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest
};
//# sourceMappingURL=net.js.map
