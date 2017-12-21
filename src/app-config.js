import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import saveEveryChange from './helpers/save-middleare'

export default {
    el: 'talentuiDevServer',
    middlewares: [saveEveryChange, ReduxThunk]
}