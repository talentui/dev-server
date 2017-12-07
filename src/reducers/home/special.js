import { v1 } from 'uuid';
import { fromJS } from 'immutable';
import * as contants from './const';

const initState = fromJS([
    {
        name: 'xxxx',
        id:v1(),
        reg: "\/ux\/upaas\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})"
    }
]);

export default function (state = initState) {
    
}