const { getConfig } = require("./getConfig");
const {
    talentuiReplacer,
    proxyDecision,
    responseType
} = require("./constants");
const url = require("url");

function searchInPass(desciptions) {
    let config = getConfig();
    let { requestPath } = desciptions;
    let matched = config.pass.find(item => {
        if (!item.enabled) return false;
        // let reg = new RegExp(item.reg);
        // return reg.test(requestPath);
        return requestPath.indexOf(item.reg) !== -1;
    });
    if (matched) {
        desciptions.decision = proxyDecision.pass;
        desciptions.identifier = matched.name;
        desciptions.responseTarget = `${desciptions.requestProtocol}://${
            config.target.ip
        }`;
        desciptions.responseType = responseType.remote;
        desciptions.responsePath = requestPath;
        desciptions.changeOrigin = false;
        return true;
    }
    return false;
}

function searchInDirect(desciptions) {
    let { direct = [] } = getConfig();
    let { requestPath } = desciptions;
    let matched = direct.find(item => {
        if (!item.enabled) return false;
        return requestPath.indexOf(item.reg) !== -1;
    });
    if (matched) {
        desciptions.responseType =
            matched.target.indexOf("://") === -1
                ? responseType.local
                : responseType.remote;
        desciptions.decision = proxyDecision.direct;
        desciptions.identifier = matched.name;
        if (desciptions.responseType === responseType.local) {
            desciptions.responseTarget = "Local File System";
            desciptions.responsePath = matched.target;
        } else {
            let oUrl = url.parse(matched.target);
            desciptions.responseTarget = `${oUrl.protocol}//${oUrl.host}`;
            desciptions.responsePath = oUrl.path;
        }
        return true;
    }
    return false;
}

function searchInSpecial(desciptions) {
    let { requestPath, requestFrom } = desciptions;
    let { special } = getConfig();
    let matched = special.find(item => {
        let { reg, referer, enabled } = item;
        if (!enabled) return false;
        referer = referer.trim();
        let regx = new RegExp(reg);
        let regMatched = regx.test(requestPath);
        if (requestFrom && referer) {
            return regMatched && requestFrom.indexOf(referer) !== -1;
        }
        return regMatched;
    });
    if (matched) {
        let { reg, port = 3000, name } = matched;
        desciptions.responseType = responseType.remote;
        desciptions.decision = proxyDecision.special;
        desciptions.identifier = name;
        desciptions.responseTarget = `http://localhost:${port}`;
        desciptions.responsePath = new RegExp(reg)
            .exec(requestPath)
            .slice(1)
            .join("");
        return true;
    }
    return false;
}

function searchInTalentUI(desciptions) {
    let { requestPath } = desciptions;
    let { talentui: { template, projects } } = getConfig();
    let matched = projects.find(project => {
        let { name, enabled } = project;
        if (!enabled) return false;
        let regx = new RegExp(template.replace(talentuiReplacer, name));
        return regx.test(requestPath);
    });
    if (matched) {
        desciptions.responseType = responseType.remote;
        desciptions.decision = proxyDecision.talentui;
        desciptions.identifier = matched.name;
        desciptions.responseTarget = `http://localhost:${matched.port}`;
        desciptions.responsePath = new RegExp(
            template.replace(talentuiReplacer, matched.name)
        )
            .exec(requestPath)
            .slice(1)
            .join("");
        return true;
    }
    return false;
}

module.exports = function findMatchConfig(req) {
    let desciptions = {
        type: 'proxy',
        requestFrom: req.headers.referer || "",
        requestPath: req.baseUrl,
        requestHost: req.host,
        requestProtocol: req.protocol,
        changeOrigin: true
    };
    // 依次匹配，是否请求是否匹配到“跳过”规则
    if (
        searchInPass(desciptions) ||
        searchInDirect(desciptions) ||
        searchInSpecial(desciptions) ||
        searchInTalentUI(desciptions)
    ) {
    } else {
        desciptions.responseType = responseType.remote;
        desciptions.changeOrigin = false;
        desciptions.decision = proxyDecision.notMatched;
        desciptions.responseTarget = `${desciptions.requestProtocol}://${
            getConfig().target.ip
        }`;
        desciptions.responsePath = desciptions.requestPath;
    }
    return desciptions;
};
