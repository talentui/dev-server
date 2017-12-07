import { fromJS } from 'immutable';
import { v1 } from 'uuid';
import combineImmutableReducers from '@talentui/biz-helper/lib/utils/combineImmutableReducers';

import * as contants from './const';
import product from './product';
import global from './global';
import target from './target';

export default combineImmutableReducers({
    product, global, target
})