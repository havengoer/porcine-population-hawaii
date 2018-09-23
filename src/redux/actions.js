import * as types from './actionConstants.js';



  export const initializeData = (pigData) => {
    return (dispatch) => {
        dispatch(setData(pigData));
        dispatch(parseYear(pigData));
      
    };
  };


  export const setData = (pigData) =>{
    return( {
    type: types.SET_DATA_TO_STATE,
    payload: pigData
  })};


export const parseYear = (pigData) => {
    //extract years
    pigData["PIG POPULATIONS"].forEach((datum, index) => {
    });
    // segregate data according to year
    const segregatedData = {};
    pigData["PIG POPULATIONS"].forEach((datum, index) => {
        if (!segregatedData[datum.year]) {
            segregatedData[datum.year] = [{island: datum.island, population: datum.pigPopulation}]
        }
        else {
            segregatedData[datum.year].push({island: datum.island, population:  datum.pigPopulation})
        }
    });
    const years = Object.keys(segregatedData);

    


  return (dispatch) => {
    dispatch(setYearsToState([...years]));
    console.log(segregatedData)
    dispatch(setSegregatedDataToState(segregatedData));
  };
};

export const setYearsToState = (years) =>{
    console.log(years)
    return({
    type: types.SET_YEARS_TO_STATE,
    payload: years
  })};

  export const setSegregatedDataToState = (data) =>{
    console.log(data)
    return({
    type: types.SET_SEGREGATED_DATA_BY_YEAR_TO_STATE,
    payload: data
  })};

  export const changeActiveYear = (data) =>{
    console.log(data)
    return({
    type: types.CHANGE_ACTIVE_YEAR,
    payload: data
  })};

