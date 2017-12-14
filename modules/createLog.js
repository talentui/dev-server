const { v1 } = require("uuid");
module.exports = function(log) {
    // return {
    //     message, type, id: v1()
    // }
    return Object.assign({ id: v1() }, log);
};
