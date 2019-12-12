export const GET_NODES = 'GET_NODES';
export const GET_SENSING_RATE = 'GET_SENSING_RATE';
export const ADD_NODE = 'ADD_NODE';
export const ADDING_NODES = 'ADDING_NODES';
export const ADDING_NEIGHBORS = 'ADDING_NEIGHBORS';
export const ADDING_FAILURE_NODE = 'ADDING_FAILURE_NODE';
export const NEIGHBOR_DISCOVERY_PHASE = 'NEIGHBOR_DISCOVERY_PHASE';
export const COVERAGE_HOLE_DETECTION_PHASE = 'COVERAGE_HOLE_DETECTION_PHASE';
export const ADD_SENSING_RATE = 'ADD_SENSING_RATE';
export const ADD_COVERAGE_HOLE = 'ADD_COVERAGE_HOLE';
export const SET_REFERENCE_NODES = 'SET_REFERENCE_NODES';
export const SET_REFERENCE = 'SET_REFERENCE';
export const SET_FAILURE = 'SET_FAILURE';
export const SET_NEIGHBORS = 'SET_NEIGHBORS';
export const ADD_NODE_ONE_HOPE_NEIGHBORS = 'ADD_NODE_ONE_HOPE_NEIGHBORS';
export const ADD_NODE_TWO_HOPE_NEIGHBORS = 'ADD_NODE_TWO_HOPE_NEIGHBORS';
export const DRAW_CIRCUM_CENTER = 'DRAW_CIRCUM_CENTER';
export const RESET = 'RESET';

export const reset = () => ({
    type: RESET,
});

export const getNodes = () => ({
    type: GET_NODES,
});

export const getSensingRate = sensingRate => ({
    type: GET_SENSING_RATE,
    sensingRate
});

export const addNodeCreator = node => ({
    type: ADD_NODE,
    node
});

export const addingNodesCreator = () => ({
    type: ADDING_NODES
});
export const addingFailureNodeCreator = () => ({
    type: ADDING_FAILURE_NODE
});
export const addingNeighborsCreator = () => ({
    type: ADDING_NEIGHBORS
});

export const neighborDiscoveryPhaseCreator = () => ({
    type: NEIGHBOR_DISCOVERY_PHASE
});

export const coverageHoleDetectionPhaseCreator = () => ({
    type: COVERAGE_HOLE_DETECTION_PHASE
});

export const addSensingRateCreator = sensingRate => ({
    type: ADD_SENSING_RATE,
    sensingRate
});

export const addCoverageHole = (referenceNode, hole) => ({
    type: ADD_COVERAGE_HOLE,
    referenceNode,
    hole
});

export const setReferenceNodesCreator = nodes => ({
    type: SET_REFERENCE_NODES,
    referenceNodes: nodes
});

export const addNodeOneHopeNeighborCreator = (node, neighbors) => ({
    type: ADD_NODE_ONE_HOPE_NEIGHBORS,
    referenceNode: node,
    neighbors
});

export const addNodeTwoHopeNeighborCreator = (node, neighbors) => ({
    type: ADD_NODE_TWO_HOPE_NEIGHBORS,
    referenceNode: node,
    neighbors
});

export const setReferenceCreator = (node) => ({
    type: SET_REFERENCE,
    referenceNode: node,
});

export const setFailure = (node) => ({
    type: SET_FAILURE,
    failureNode: node,
});

export const drawCircumCenterCreator = (node) => ({
    type: DRAW_CIRCUM_CENTER,
    circumCenter: node,
});

