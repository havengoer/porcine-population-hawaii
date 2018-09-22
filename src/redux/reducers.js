import * as types from './actionConstants.js';
// eslint-disable-next-line
const initialState = { 
  };
  
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_DATA_TO_STATE: {
          console.log(action, action.payload)
        let pigPopulation = action.payload
        return { 
            ...state, 
            pigPopulation }
        }
      default: {
        return state
      }
       
  }
}
  export default dataReducer;
  