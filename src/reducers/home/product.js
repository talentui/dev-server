import { v1 } from 'uuid';
import { fromJS } from 'immutable';
import {constProduct} from './const';

const initState = fromJS([
    {
        name: 'upaas',
        id: v1(),
        port: '3001',
        configs: [
            {
                reg: "\/ux\/upaas\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})",
                name: '项目配置',
                replace: 'hehehe',
                id: v1()
            }
        ]
    },
    {
        name: 'upaas-portal',
        id: v1(),
        port: '3000',
        configs: [
            {
                reg: "\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})",
                name: '项目配置',
                id: v1()
            }
        ]
    }
]);

export default function (state = initState, action) {
    switch (action.type) {
        case constProduct.CHANGE_PROD_CONFIG_NAME: {
            let prodIndex = state.findIndex(item => item.get('id') === action.prodId);
            return state.updateIn([prodIndex, 'configs'], prodConfigs => {
                let configIndex = prodConfigs.findIndex(config => config.get('id') === action.configId);
                return prodConfigs.update(configIndex, config => {
                    return config.set('name', action.name)
                })
            });
        }

        case constProduct.CHANGE_PROD_CONFIG_REG: {
            let prodIndex = state.findIndex(item => item.get('id') === action.prodId);
            return state.updateIn([prodIndex, 'configs'], prodConfigs => {
                let configIndex = prodConfigs.findIndex(config => config.get('id') === action.configId);
                return prodConfigs.update(configIndex, config => {
                    return config.set('reg', action.reg)
                })
            });
        }

        case constProduct.CHANGE_PROD_NAME: {
            let prodIndex = state.findIndex(item => item.get('id') === action.prodId);
            return state.setIn([prodIndex, 'name'], action.name)
        }

        case constProduct.CHANGE_PROD_PORT: {
            let prodIndex = state.findIndex(item => item.get('id') === action.prodId);
            return state.setIn([prodIndex, 'port'], action.port)
        }

        case constProduct.ADD_A_PRODUCT: {
            return state.push(fromJS(action.prod));
        }

        case constProduct.ADD_A_PRODUCT_CONFIG: {
            let prodIndex = state.findIndex(item => item.get('id') === action.prodId);
            return state.updateIn([prodIndex, 'configs'], configs => {
                return configs.push(fromJS(action.config))
            })
        }
    }
    return state;
}