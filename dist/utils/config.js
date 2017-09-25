"use strict";

/**
  * 环境检查
  * @param localEnv
*/
var checkCurrentEnv = function checkCurrentEnv(localEnv) {
  var SERVER = {
    url: {
      teacher: "/teacher/web",
      boss: "/teacher/boss",
      file: '/teacher/file'
    },
    env: localEnv
  };

  if (localEnv) {
    localEnv = localEnv + '.';
  }
  //端口检查
  for (var obj in SERVER.url) {
    //服务地址
    SERVER.url[obj] = "http://" + localEnv + "imzhiliao.com" + SERVER.url[obj];
  }
  return SERVER;
};

//环境检测
//当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
var SERVER = checkCurrentEnv("dev");

console.log('当前服务器地址....', SERVER);

module.exports = SERVER;
//# sourceMappingURL=config.js.map
