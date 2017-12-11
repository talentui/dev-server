const { getConfig } = require("./getConfig");
const { talentuiReplacer } = require("./constants");

function getAllPort(product) {
    return product.map(item => {
        return item.port;
    });
}

function searchInSpecial(special, url, req) {
    let { headers: { referer: reqReferer } } = req;
    let regx;
    let matched = special.find(item => {
        let { reg, referer: configReferer, enabled } = item;
        if (!enabled) return false;
        configReferer = configReferer.trim();
        regx = new RegExp(reg);
        let regMatched = regx.test(url);
        if (reqReferer) {
            return regMatched && reqReferer.indexOf(configReferer) !== -1;
        }
        return regMatched;
    });
    if (matched) {
        return {
            type: "special",
            matched: Object.assign({}, matched, {
                regx
            })
        };
    }
}

function searchInTalentUI(talentui, url) {
    let { template, projects } = talentui;
    let regx;
    let matched = projects.find(project => {
        let { name, enabled } = project;
        if (!enabled) return false;
        regx = new RegExp(template.replace(talentuiReplacer, name));
        return regx.test(url);
    });
    if (!matched) return;
    return {
        type: "talentui",
        matched: Object.assign({}, matched, {
            regx
        })
    };
}

function urlShouldPass(pass, url) {
    return pass.find(item => {
        if (!item.enabled) return false;
        let reg = new RegExp(item.reg);
        return reg.test(url);
    });
}

module.exports = function findMatchConfig(req) {
    let { baseUrl: url } = req;
    let notfound = {
        type: "notfound"
    };
    let config = getConfig();
    let { pass } = config;
    if (urlShouldPass(pass, url)) return notfound;
    let { talentui } = config;
    let matchedTalentui = searchInTalentUI(talentui, url);
    if (matchedTalentui) return matchedTalentui;
    let searchSpecial = searchInSpecial(config.special, url, req);
    if (searchSpecial) return searchSpecial;
    return notfound;
};
