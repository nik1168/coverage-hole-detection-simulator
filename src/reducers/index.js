import {combineReducers} from 'redux'
import {theoretical} from "./theoretical";
import {demo} from "./demo";

const rootReducer = combineReducers({
    theorems: theoretical,
    demo : demo
});
export default rootReducer;