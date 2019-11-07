import {GET_THEORETICAL_THEOREMS} from '../actions/theoretical'

export function theoretical(state = [], action) {
    const {theorems} = action;
    switch (action.type) {
        case GET_THEORETICAL_THEOREMS:
            return {...state, theorems};
        default:
            return state;
    }
}