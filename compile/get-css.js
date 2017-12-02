module.exports = function (assets){
    let reg = /.css$/;
    return Object.keys(assets).filter(item => reg.test(item));
}