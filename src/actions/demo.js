
export const GET_NODES = 'GET_NODES';
export const GET_SENSING_RATE = 'GET_SENSING_RATE';
export const ADD_NODE = 'ADD_NODE';
export const ADDING_NODES = 'ADDING_NODES';
export const NEIGHBOR_DISCOVERY_PHASE = 'NEIGHBOR_DISCOVERY_PHASE';
export const ADD_SENSING_RATE = 'ADD_SENSING_RATE';
export const ADD_COVERAGE_HOLE = 'ADD_COVERAGE_HOLE';
export const SET_REFERENCE_NODES = 'SET_REFERENCE_NODES';
export const SET_REFERENCE = 'SET_REFERENCE';
export const SET_NEIGHBORS = 'SET_NEIGHBORS';
export const ADD_NODE_ONE_HOPE_NEIGHBORS = 'ADD_NODE_ONE_HOPE_NEIGHBORS';
export const ADD_NODE_TWO_HOPE_NEIGHBORS = 'ADD_NODE_TWO_HOPE_NEIGHBORS';

export const getNodes = () => ({
    type: GET_NODES,
});

export const getSensingRate = sensingRate => ({
    type: GET_SENSING_RATE,
    sensingRate
});

export const addNodeCreator= node => ({
    type: ADD_NODE,
    node
});

export const addingNodesCreator = () => ({
    type: ADDING_NODES
});

export const neighborDiscoveryPhaseCreator = () => ({
    type: NEIGHBOR_DISCOVERY_PHASE
});


export const addSensingRateCreator = sensingRate => ({
    type: ADD_SENSING_RATE,
    sensingRate
});

export const addCoverageHole = hole => ({
    type: ADD_COVERAGE_HOLE,
    hole
});

export const setReferenceNodesCreator = nodes => ({
    type: SET_REFERENCE_NODES,
    referenceNodes : nodes
});

export const addNodeOneHopeNeighborCreator = (node, neighbors) => ({
    type: ADD_NODE_ONE_HOPE_NEIGHBORS,
    referenceNode : node,
    neighbors
});

export const addNodeTwoHopeNeighborCreator = (node, neighbors) => ({
    type: ADD_NODE_TWO_HOPE_NEIGHBORS,
    referenceNode : node,
    neighbors
});

export const setReferenceCreator = (node) => ({
    type: SET_REFERENCE,
    referenceNode : node,
});

