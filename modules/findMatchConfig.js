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
        let { reg, referer: configReferer } = item;
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
        let { name } = project;
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

module.exports = function findMatchConfig(req) {
    let { baseUrl: url } = req;
    let config = getConfig();
    let { talentui } = config;
    let matchedTalentui = searchInTalentUI(talentui, url);
    if (matchedTalentui) return matchedTalentui;
    let searchSpecial = searchInSpecial(config.special, url, req);
    if (searchSpecial) return searchSpecial;
    return {
        type: "notfound"
    };
};
