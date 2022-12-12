const moment = require("moment");
// 함수 하나를 export합니다. 
exports.now = function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}