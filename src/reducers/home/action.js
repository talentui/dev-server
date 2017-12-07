import { constProduct, constGlobal, constTarget } from './const';
import { v1 } from 'uuid'

export function saveData(){
    return function(dispatch, getState){
        
    }
}

export const homeProductActions = {
    addProduct: function (port) {
        return {
            type: constProduct.ADD_A_PRODUCT,
            prod: {
                name: '',
                id: v1(),
                port,
                configs: []
            }
        }
    },
    changeConfigName: function (name, prodId, configId) {
        return {
            type: constProduct.CHANGE_PROD_CONFIG_NAME,
            name, prodId, configId
        }
    },
    changeConfigValue: function (reg, prodId, configId) {
        return {
            type: constProduct.CHANGE_PROD_CONFIG_REG,
            reg, prodId, configId
        }
    },

    changeProdName: function (name, prodId) {
        return {
            type: constProduct.CHANGE_PROD_NAME,
            name, prodId
        }
    },

    changeProdPort: function (port, prodId) {
        return {
            type: constProduct.CHANGE_PROD_PORT,
            port, prodId
        }
    },

    addConfigToProd: function (prodId) {
        return {
            type: constProduct.ADD_A_PRODUCT_CONFIG,
            prodId,
            config: {
                reg: '',
                name: '',
                id: v1()
            }
        }
    }
}

export const homeGlobalActions = {
    addglobal: function () {
        return {
            type: constGlobal.ADD_A_GLOBAL, config: {
                name: '',
                id: v1(),
                reg: ''
            }
        }
    },
    changeGlobalName: function (name, globalId) {
        return { type: constGlobal.CHANGE_GLOBAL_NAME, name, globalId }
    },
    changeGlobalReg: function(reg, globalId){
        return {type: constGlobal.CHANGE_GLOBAL_REG, reg, globalId}
    },
}

export const homeTargetActions = {
    changeTargetName: function(name){
        return {
            type: constTarget.CHANGE_TARGET_NAME, name   
        }
    },
    changeTargetIP: function(ip){
        return {
            type: constTarget.CHANAGE_TARGET_IP, ip
        }
    }
}