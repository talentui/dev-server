import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import save from './helpers/save-middleare'

export default {
    el: 'talentuiDevServer',
    middlewares: [save, ReduxThunk]
}