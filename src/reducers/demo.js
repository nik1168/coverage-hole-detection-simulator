import {
    ADD_NODE,
    ADD_NODE_ONE_HOPE_NEIGHBORS,
    ADD_NODE_TWO_HOPE_NEIGHBORS,
    ADD_SENSING_RATE,
    ADD_COVERAGE_HOLE,
    ADDING_NODES,
    NEIGHBOR_DISCOVERY_PHASE,
    COVERAGE_HOLE_DETECTION_PHASE,
    GET_NODES,
    GET_SENSING_RATE,
    SET_REFERENCE,
    SET_REFERENCE_NODES,
    DRAW_CIRCUM_CENTER
} from "../actions/demo";
import {Point} from "../sketches/sketch";

export const demo = (state = {
    nodes: [],
    sensingRate: 80,
    addingNodes: false,
    neighborDiscoveryPhase: false,
    coverageHoleDetectionPhase: false,
    coverageHoles: [],
    referenceNodes: [],
    circumCenter: new Point(0, 0)
}, action) => {
    const {node, sensingRate, referenceNodes, neighbors, referenceNode, circumCenter, hole} = action;

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
            return {
                ...state,
                addingNodes: !state.addingNodes
            };
        case NEIGHBOR_DISCOVERY_PHASE:
            return {
                ...state,
                neighborDiscoveryPhase: !state.neighborDiscoveryPhase
            };
        case COVERAGE_HOLE_DETECTION_PHASE:
            return {
                ...state,
                coverageHoleDetectionPhase: !state.coverageHoleDetectionPhase
            };
        case ADD_NODE:
            let copy = {
                ...state,
                ['nodes']: [...state.nodes]
            };
            copy.nodes.push(node);
            return copy;
        case ADD_COVERAGE_HOLE:
            let prevStateHole = {
                ...state,
            };
            prevStateHole.nodes[referenceNode].coverageHolesAroundNode.push(hole);
            return prevStateHole;
        case SET_REFERENCE_NODES:
            return {
                ...state,
                ['referenceNodes']: referenceNodes
            };
        case DRAW_CIRCUM_CENTER:
            return {
                ...state,
                circumCenter
            };
        case ADD_NODE_ONE_HOPE_NEIGHBORS:
            let prevStateOneHop = {
                ...state,
            };
            prevStateOneHop.nodes[referenceNode].oneHopeNeighbors = neighbors;
            return prevStateOneHop;
        case ADD_NODE_TWO_HOPE_NEIGHBORS:
            let prevStateTwoHop = {
                ...state,
            };
            prevStateTwoHop.nodes[referenceNode].twoHopeNeighbors = neighbors;
            return prevStateTwoHop;
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
