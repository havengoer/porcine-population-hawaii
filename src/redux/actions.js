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


  
export const initializeCharts = (pigData) =>{
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
    const yearsInInt = years.map(e =>{
       return parseInt(e, 10)
      }); //converts back to int

    return (dispatch) => {
      dispatch(setYearsToState([...yearsInInt]));
      dispatch(changeActiveYear([...years][0])); //default
      dispatch(setSegregatedDataToState(segregatedData));
  };
};

export const setYearsToState = (years) =>{
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

export const setInitialYear = (data) =>{
    return({
    type: types.SET_INITIAL_YEAR,
    payload: data
  })};
  
  export const playButton = () =>{
      // TO DO: move the play button here
    return({
    type: types.PLAY_BUTTON,
    payload: '0'
  })

};

