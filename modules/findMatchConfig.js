const { getConfig } = require('./getConfig');


function searchInProduct(product, url) {

    let configIndex;
    let matchedProduct = product.find(item => {
        let { configs } = item;
        let length = configs.length;
        for (let i = 0; i < length; i++) {
            let { reg } = configs[i];
            reg = new RegExp(reg);
            let testResult = reg.test(url);
            if (testResult) {
                configIndex = i;
                return true;
            }
        }
        return false;
    })
    if (matchedProduct) {
        return {
            type: 'product',
            product: matchedProduct,
            index: configIndex
        }
    }
}

function getAllPort(product) {
    return product.map(item => {
        return item.port;
    })
}

function searchInSpecial(special, url, req) {
    let { headers: { referer: reqReferer } } = req;
    return special.find(item => {
        let { reg, referer: configReferer } = item;
        configReferer = configReferer.trim()
        reg = new RegExp(reg);
        let regMatched = reg.test(url);
        if (reqReferer) {
            return regMatched && reqReferer.indexOf(configReferer) !== -1;
        }
        return regMatched;
    })

}

module.exports = function (url, req) {
    let config = getConfig();
    let { product } = config;
    let searchProduct = searchInProduct(product, url);
    if (searchProduct) return searchProduct;
    let searchSpecial = searchInSpecial(config.special, url, req)
    if (searchSpecial) {
        let allPort = getAllPort(product);
        return {
            type: 'special',
            special: searchSpecial,
        }
    }
    return {
        type: 'notfound'
    }
}