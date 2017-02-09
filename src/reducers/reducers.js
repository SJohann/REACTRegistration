import { combineReducers } from 'redux'
import { GET_DATA } from '../actions/actions'

function allData(state = {
    data : { app_status:0, reg_status:0, code:"", msg:"" }
}, action) {
    console.log(action.type);
    switch (action.type) {

        case GET_DATA:
            return { state, data : action.data };

        default:
            return state;
    }
}

const ReduxApp = combineReducers({
    allData
});

export default ReduxApp;