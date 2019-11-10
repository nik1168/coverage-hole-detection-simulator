import {GET_NODES,ADD_NODE,GET_SENSING_RATE, ADD_SENSING_RATE} from "../actions/demo";

export const demo = (state = {
    nodes: [],
    sensingRate: 4,
    addingNewNode : false,
    neighborDiscoveryPhase: false,
    coverageHoleDetectionPhase : false,
    coverageHoles : []
}, action) => {
    const {node,sensingRate} = action;

    switch (action.type) {
        case GET_NODES:
            return {
                ...state
            };
        case GET_SENSING_RATE:
            return {
                ...state
            };
        case ADD_NODE:
            let copy = {
                ...state,
                ['nodes'] : [...state.nodes]
            };
            copy.nodes.push(node);
            return copy;
        case ADD_SENSING_RATE:
            return {
                ...state,
                sensingRate : sensingRate
            };
        default:
            return state
    }
};