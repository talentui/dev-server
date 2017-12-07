const DEFAULT_PROJ_CONFIG = '\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})'
const DEFAULT_DLL_CONFIG = '^\/ux\/upaas\/(?:@\w+\/[\w-]+)\/release\/dist\/([a-z-]+)-(?:\d+\.\d+\.\d+)(?:\.min)?(\.js)'

export const SAVE_CONFIG_TO_SERVER = 'save the config data to the server';
export const GET_CONFIG_FROM_SERVER = 'get the config data from the sever';
export const SAVE_CONFIG_SUCCESS = 'save data to server success';
export const CLEAR_SAVING_STATUS = 'remove the saving status from store';

export const constProduct = {
    CHANGE_PROD_NAME: 'change a product name',
    CHANGE_PROD_PORT: 'change a product port',
    CHANGE_PROD_CONFIG_NAME: 'change product config name',
    CHANGE_PROD_CONFIG_REG: 'change product config regexp',
    ADD_A_PRODUCT: 'add a product',
    ADD_A_PRODUCT_CONFIG: 'add a config to product',
}

export const constGlobal = {
    ADD_A_GLOBAL: 'add a global config',
    CHANGE_GLOBAL_REG: 'change a global config regexp',
    CHANGE_GLOBAL_NAME: 'change the name of a global config'
}

export const constTarget = {
    CHANGE_TARGET_NAME: 'change the name of the target server',
    CHANAGE_TARGET_IP: 'change the public ip of the target server'
}