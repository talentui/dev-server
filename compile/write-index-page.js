const path = require('path');
const fs = require('fs');
const constants = require('./const');
module.exports = function (css, js) {
    let cssPath = '';
    let jsPath = '';
    let reg = new RegExp();
    let cwd = process.cwd();
    let srcTemplatePath = path.resolve(cwd, constants.srcTemplte);
    let targetTemplatePath = path.resolve(cwd, constants.targetTemplate);
    let template = fs.readFileSync(srcTemplatePath, 'utf8');
    css.forEach(item => {
        cssPath += `<link rel="stylesheet" href="${item}">\n`
    });
    js.forEach(item => {
        jsPath += `<script src="${item}"></script>\n`
    })
    reg.compile(constants.cssReg);
    template = template.replace(reg, cssPath);
    reg.compile(constants.jsReg);
    template = template.replace(reg, jsPath)
    fs.writeFileSync(targetTemplatePath, template, 'utf8');
}
