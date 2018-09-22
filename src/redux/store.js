import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import pigPopulationReducer from './reducers';


export default () => {
  const store = createStore(
    combineReducers({
      pigPopulationInHawaii: pigPopulationReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
