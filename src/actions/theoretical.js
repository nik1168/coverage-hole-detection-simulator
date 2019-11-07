export const GET_THEORETICAL_THEOREMS = 'GET_THEORETICAL_THEOREMS';

export const getTheorems = theorems => ({
    type: GET_THEORETICAL_THEOREMS,
    theorems
});

export const getTheoremsCreator = () => dispatch =>
    (
        dispatch(getTheorems({}))
    );

