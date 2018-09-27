import * as types from './actionConstants.js';
const initialState = {};


const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATA_TO_STATE:
            {
                let pigPopulation = action.payload
                return {
                    ...state,
                    pigPopulation
                }
            }
        case types.SET_YEARS_TO_STATE:
            {
                let years = action.payload;

                return {
                    ...state,
                    years
                }
            }
        case types.SET_SEGREGATED_DATA_BY_YEAR_TO_STATE:
            {
                let segregatedData = action.payload;

                return {
                    ...state,
                    segregatedData
                }
            }
        case types.CHANGE_ACTIVE_YEAR:
            {
                const activeYear = action.payload;

                return {
                    ...state,
                    activeYear
                }
            }
        case types.SET_INITIAL_YEAR:
            {
                const initialYear = action.payload;

                return {
                    ...state,
                    initialYear
                }
            }
            default:
            {
                return state
            }

    }
}
export default dataReducer;