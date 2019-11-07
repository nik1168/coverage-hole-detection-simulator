import {combineReducers} from 'redux'
import {theoretical} from "./theoretical";

const rootReducer = combineReducers({
    theorems: theoretical
});
export default rootReducer;