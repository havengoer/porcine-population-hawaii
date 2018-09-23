import * as types from './actionConstants.js';
// eslint-disable-next-line
const initialState = {};


const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATA_TO_STATE:
            {
                console.log(action, action.payload)
                let pigPopulation = action.payload
                return {
                    ...state,
                    pigPopulation
                }
            }
        case types.SET_YEARS_TO_STATE:
            {
                console.log(action, action.payload)
                let years = action.payload;

                return {
                    ...state,
                    years
                }
            }
        case types.SET_SEGREGATED_DATA_BY_YEAR_TO_STATE:
            {
                console.log(action, action.payload)
                let segregatedData = action.payload;

                return {
                    ...state,
                    segregatedData
                }
            }
            case types.CHANGE_ACTIVE_YEAR:
            {
                console.log(action, action.payload)
                let activeYear = action.payload;

                return {
                    ...state,
                    activeYear
                }
            }
        default:
            {
                return state
            }

    }
}
export default dataReducer;