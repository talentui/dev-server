module.exports = {
    configFile: ".tdsconfig.json",
    homePath:
        process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    talentuiReplacer: /{{\s*project\s*}}/,
    socketio: "socketio",
    roomLog: "logger",
    msgLog: "log",
    proxyDecision: {
        pass: "匹配到忽略规则，转发到线上",
        direct: "直配成功, 返回用户设置的target",
        talentui: "匹配talentui成功，将代理此请求",
        notMatched: "匹配失败，转发到线上",
        special: "匹配规则成功，将代理此请求"
    },
    responseType: {
        remote: 'remote',
        local: 'local'
    }
};
