import {
    ADD_NODE,
    ADD_NODE_ONE_HOPE_NEIGHBORS,
    ADD_NODE_TWO_HOPE_NEIGHBORS,
    ADD_SENSING_RATE,
    ADD_COVERAGE_HOLE,
    ADDING_NODES,
    ADDING_FAILURE_NODE,
    NEIGHBOR_DISCOVERY_PHASE,
    COVERAGE_HOLE_DETECTION_PHASE,
    GET_NODES,
    GET_SENSING_RATE,
    SET_REFERENCE,
    SET_FAILURE,
    SET_REFERENCE_NODES,
    DRAW_CIRCUM_CENTER, RESET, ADDING_NEIGHBORS, ADD_GENERAL_HOLES
} from "../actions/demo";
import {Point} from "../utils/geometryUtils";

const initialState = {
    nodes: [],
    sensingRate: 80,
    addingNodes: false,
    addingNeighbors: false,
    addingFailureNode: false,
    neighborDiscoveryPhase: false,
    coverageHoleDetectionPhase: false,
    coverageHoles: [],
    referenceNodes: -1,
    circumCenter: new Point(0, 0)
};

export const demo = (state = initialState, action) => {
    const {node, sensingRate, referenceNodes, neighbors, referenceNode, circumCenter, failureNode, holes, generalHoles} = action;

    switch (action.type) {
        case RESET:
            return initialState;
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
        case ADDING_NEIGHBORS:
            return {
                ...state,
                addingNeighbors: !state.addingNeighbors
            };
        case ADDING_FAILURE_NODE:
            return {
                ...state,
                addingFailureNode: !state.addingFailureNode
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
            prevStateHole.nodes[referenceNode].coverageHolesAroundNode = holes;
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
                ...state
            };
            prevStateSetReference.nodes[referenceNode].isReference = !prevStateSetReference.nodes[referenceNode].isReference;
            prevStateSetReference.referenceNodes = prevStateSetReference.nodes[referenceNode].isReference ? referenceNode : -1;
            return prevStateSetReference;
        case SET_FAILURE:
            let prevStateSetFailure = {
                ...state
            };
            prevStateSetFailure.nodes[failureNode].active = !prevStateSetFailure.nodes[failureNode].active;
            return prevStateSetFailure;
        case ADD_SENSING_RATE:
            return {
                ...state,
                sensingRate: sensingRate
            };
        case ADD_GENERAL_HOLES:
            return {
                ...state,
                coverageHoles: generalHoles
            };
        default:
            return state
    }
};
