import React, {
  Component
} from "react";
import "./App.css";
import {
  connect
} from 'react-redux';
import * as d3 from "d3";

class App extends Component {


  componentDidMount() {


    this.createBarChart();
  }

  // componentDidUpdate() {
  // }

  createBarChart() {

    var width = 800;
    var height = 800;
    var margin = {
      top: 10,
      bottom: 70,
      left: 70,
      right: 20
    }

    var svg = d3.select('#vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    var data = {};

  
  }

  render() {


      let pigPopulation = <tr> <td> Loading </td></tr > ;

      if (this.props.data) {

        pigPopulation = this.props.data["PIG POPULATIONS"].map((datum, index) => ( 
        < tr key = {index } >
            <td > {datum.year } x </td>
            <td > {datum.island} </td> 
            <td >{ datum.pigPopulation} </td>
         </tr>
             ))

            console.log(pigPopulation);

          }
          return ( 
            <div className = "App" >
            <table>
            <tbody>
            <tr>
            <th> Year </th> <th > Island </th> 
            <th> Population </th> 
            </tr> {pigPopulation} </tbody> 
            </table> 
            </div>
          );
        }
      }

      const mapDispatchToProps = dispatch => ({

      });

      const mapStateToProps = state => {
        console.log(state)
        return ({
          data: state.pigPopulationInHawaii.pigPopulation
        });
      }

      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(App);