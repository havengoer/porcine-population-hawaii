import * as types from './actionConstants.js';


export const initializeData = (pigData) =>{
    console.log(pigData)
    return({
    type: types.SET_DATA_TO_STATE,
    payload: pigData
  })};