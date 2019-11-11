
export const GET_NODES = 'GET_NODES';
export const GET_SENSING_RATE = 'GET_SENSING_RATE';
export const ADD_NODE = 'ADD_NODE';
export const ADD_SENSING_RATE = 'ADD_SENSING_RATE';
export const ADD_COVERAGE_HOLE = 'ADD_COVERAGE_HOLE';

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


export const addSensingRateCreator = sensingRate => ({
    type: ADD_SENSING_RATE,
    sensingRate
});

export const addCoverageHole = hole => ({
    type: ADD_COVERAGE_HOLE,
    hole
});

