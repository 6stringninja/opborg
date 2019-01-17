
const config = require('config');
exports.all = config.get("config");

Object.keys(this.all).forEach((key)=>{
    exports[key] = config.config.get(key);
})