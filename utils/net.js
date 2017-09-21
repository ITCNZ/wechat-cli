var Promise = require('./promise') ;

// var UI = require('./ui.js');
//
// var checkStatus = function (response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText);
//     error.response = response;
//     throw error
//   }
// }
//
// var parseJSON = function (response) {
//   return response.json();
// }
//
// var postJSON = function (url, data) {
//   data = data || {};
//   return wx.request(url, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(checkStatus)
//     .then(parseJSON)
// }
//
//
// var postFORM = function (url, data) {
//   let formData = "";
//   if (data) {
//     for (let key in data) {
//       formData += key + "=" + data[key] + "&";
//     }
//     formData = formData.substring(0, formData.length - 1);
//   }
//
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//     },
//     body: formData
//   })
//     .then(checkStatus)
//     .then(parseJSON)
// }
//
//
// var getJSON = function (url, data) {
//   data = data || {};
//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(checkStatus)
//     .then(parseJSON)
// }
//
// var getUrl = function (url, data) {
//   data = data || {};
//   return fetch(url, {
//     method: 'GET'
//   })
//     .then(checkStatus)
//     .then(parseJSON)
// }
//
//
// var postCicadaJSON = function (url, params, data, config) {
//
//   //url鉴权
//   let token = Storage.getLg("mingshi_token");
//   if (token) {
//     params = params || {};
//     params.token = token;
//   }
//
//   var i = 0;
//   var isHasPraram;
//
//   //检测url
//   if (url.indexOf("?") != -1) {
//     isHasPraram = true;
//   }
//
//   for (var o in params) {
//     if (params[o] == undefined || params[o] == null) {
//       continue;
//     }
//     if (i == 0 && !isHasPraram) {
//       url += "?" + o + "=" + params[o];
//     }
//     else {
//       url += "&" + o + "=" + params[o];
//     }
//     i++;
//   }
//   var postBody = {
//     "style": "",
//     "clientInfo": {
//       "clientType": "web"
//     },
//     "data": data
//   }
//
//   if (config && config.hasLoading) {
//     UI.loading("show");
//   }
//
//   return new Promise(function (resolve, reject) {
//     postJSON(url, postBody)
//       .then(function (res) {
//         if (config && config.hasLoading) {
//           UI.loading("hide");
//         }
//         if (res && res.rtnCode == "0000000") {
//           resolve(res);
//         }
//         else {
//           //未登录
//           if (res && res.rtnCode == "80000009") {
//             window.getRouter().push({
//               path: `/auth/login`
//             });
//             return;
//           }
//           UI.toast(res.msg, 'warning');
//           reject(res.msg);
//         }
//       })
//       .catch(function (err) {
//         if (config && config.hasLoading) {
//           UI.loading("hide");
//         }
//         UI.toast("哎呀，网络连接出错啦");
//         reject(err);
//       })
//   });
// }
//
//
// var isOnline = function () {
//   return navigator.onLine;
// }
//
//
//
// module.exports = {
//   postJSON: postJSON,
//   getJSON: getJSON,
//   getUrl: getUrl,
//   postFORM: postFORM,
//   isOnline: isOnline,
//   postCicadaJSON: postCicadaJSON
// }


function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
  );
};

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'json'
    }
  })
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
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest
}