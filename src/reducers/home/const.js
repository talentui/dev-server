const DEFAULT_PROJ_CONFIG =
    "/ux/upaas-portal/release/dist/((?:w+/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-w+)?(.chunk)?(?:.min)?(.w{2,4})";
const DEFAULT_DLL_CONFIG =
    "^/ux/upaas/(?:@w+/[w-]+)/release/dist/([a-z-]+)-(?:d+.d+.d+)(?:.min)?(.js)";

export const SAVE_CONFIG_TO_SERVER = "save the config data to the server";
export const GET_CONFIG_FROM_SERVER = "get the config data from the sever";
export const SAVE_CONFIG_SUCCESS = "save data to server success";
export const CLEAR_SAVING_STATUS = "remove the saving status from store";

export const constProduct = {
    CHANGE_PROD_NAME: "change a product name",
    CHANGE_PROD_PORT: "change a product port",
    CHANGE_PROD_CONFIG_NAME: "change product config name",
    CHANGE_PROD_CONFIG_REG: "change product config regexp",
    ADD_A_PRODUCT: "add a product",
    ADD_A_PRODUCT_CONFIG: "add a config to product",
    DELETE_A_PRODUCT: "delete a product",
    DELETE_A_PRODUCT_CONFIG: "delete a product config"
};

export const constSpecial = {
    ADD_A_SPECIAL: "add a special config",
    CHANGE_SPECIAL_REG: "change a special config regexp",
    CHANGE_SPECIAL_NAME: "change the name of a special config",
    CHANGE_SPECIAL_PORT: "change the port of the special config",
    CHANAGE_SPECIAL_REFERER: "change the referer of the special config",
    DELETE_A_SPECIAL: "delete a special config",
    TOGGLE_SPECIAL_ENABLED: "toggle the state of the special config",
    CHANAGE_SPECIAL_DIRECT_MATCH: 'change the direct match of the special config'
};

export const constTarget = {
    CHANGE_TARGET_NAME: "change the name of the target server",
    CHANAGE_TARGET_IP: "change the public ip of the target server"
};

export const constTalentUI = {
    ADD_TALENTUI_PROJECT: "add a talentui project",
    CHANAGE_TALENTUI_PROJECT_NAME: "change the name of a talentui project",
    CHANAGE_TALENTUI_PROJECT_PORT: "change the port of a talentui project",
    CHANAGE_TALENTUI_TEMPLATE: "change reg template of the talentui proxy",
    TOGGLE_TALENTUI_ENABLED: "toggle enabled state of talentui config item",
    DELETE_TALENTUI_PROJECT: "delete a talentui project"
};

export const constPass = {
    ADD_PASS_CONFIG: "add a pass config",
    DELETE_PASS_CONFIG: "delete a pass config",
    TOGGLE_PASS_ENABLED: "toggle the enabled state of a pass config",
    CHANAGE_PASS_REG: "change the reg of a pass config"
};
