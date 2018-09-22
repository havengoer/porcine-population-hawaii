import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import configureStore from './redux/store.js';
import { Provider } from "react-redux";
import { initializeData } from './redux/actions';
import pigData from "./wild-pig-data.json";

const store = configureStore();


ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById("root"));


store.dispatch(initializeData(pigData));
