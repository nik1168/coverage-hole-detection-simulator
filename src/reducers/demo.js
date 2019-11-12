import {
    GET_NODES,
    ADD_NODE,
    GET_SENSING_RATE,
    ADD_SENSING_RATE,
    ADDING_NODES,
    SET_REFERENCE_NODES,
    ADD_NODE_ONE_HOPE_NEIGHBORS,
    SET_REFERENCE
} from "../actions/demo";

export const demo = (state = {
    nodes: [],
    sensingRate: 4,
    addingNodes: false,
    neighborDiscoveryPhase: false,
    coverageHoleDetectionPhase: false,
    coverageHoles: [],
    referenceNodes: []
}, action) => {
    const {node, sensingRate, addingNodes, referenceNodes, neighbors, referenceNode} = action;

    switch (action.type) {
        case GET_NODES:
            return {
                ...state
            };
        case GET_SENSING_RATE:
            return {
                ...state
            };
        case ADDING_NODES:
            console.log("Adding nodes Reducer");
            return {
                ...state,
                addingNodes: !state.addingNodes
            };
        case ADD_NODE:
            let copy = {
                ...state,
                ['nodes']: [...state.nodes]
            };
            copy.nodes.push(node);
            return copy;
        case SET_REFERENCE_NODES:
            var prevState = {
                ...state,
                ['referenceNodes']: referenceNodes
            };
            return prevState;
        case ADD_NODE_ONE_HOPE_NEIGHBORS:
            let prevStateOneHop = {
                ...state,
            };
            prevStateOneHop.nodes[referenceNode].oneHopeNeighbors = neighbors;
            return prevStateOneHop;
        case SET_REFERENCE:
            let prevStateSetReference = {
                ...state,
            };
            prevStateSetReference.nodes[referenceNode].isReference = !prevStateSetReference.nodes[referenceNode].isReference;
            return prevStateSetReference;
        case ADD_SENSING_RATE:
            return {
                ...state,
                sensingRate: sensingRate
            };
        default:
            return state
    }
};