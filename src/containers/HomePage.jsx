import React, { Component } from "react";
import "./App.css";
import BarChart from '../components/BarChart.jsx'
import Slider from '../components/Slider.jsx'
import * as qs from 'query-string';
import { setInitialYear } from "../redux/actions";

import { connect } from 'react-redux';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.year = null;
  }
  componentWillMount() {
    // extract the search query
     const { year} = qs.parse(this.props.location.search)

     if (year) {
       // dispatches an action to update year from query string
       this.year = new Date(year, 0, 1);
     } 
   }


   componentDidUpdate() {
    this.props.setInitialYear(this.year);
  }
  render() {

          return ( 
            <div className = "home" >
             <h2>Pig Population in the State of Hawaii</h2>

             <div id="vis_barchart">
            </div>
                <BarChart  activeYear={this.props.activeYear}/>
                <div className="row">
                <button id="play-button">Play</button>
                <Slider/>
                </div>
            </div>
          );
        }
      }

  
const mapDispatchToProps = dispatch => ({
        setInitialYear: (year) => dispatch(setInitialYear(year)),

});

const mapStateToProps = state => {
  return ({
    data: state.pigPopulationInHawaii.pigPopulation,
    years: state.pigPopulationInHawaii.years,
    activeYear: state.pigPopulationInHawaii.activeYear,
    segData: state.pigPopulationInHawaii.segregatedData
  });
}
export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(HomePage);

