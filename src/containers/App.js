import React, { Component } from "react";
import "./App.css";
import { connect } from 'react-redux';
import * as d3 from "d3";

class App extends Component {


  componentDidMount() {
  

    this.createBarChart();
  }

  // componentDidUpdate() {
  //   // this.createBarChart();
  // }
  createBarChart() {
//     var width = document.getElementById('vis')
//     .clientWidth;
// var height = document.getElementById('vis')
//     .clientHeight;

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

var x_scale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

var y_scale = d3.scaleLinear()
    .range([height, 0]);

var colour_scale = d3.scaleQuantile()
    .range(["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

var y_axis = d3.axisLeft(y_scale);
var x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');

svg.append('g')
    .attr('class', 'y axis');

function draw(year) {

    var csv_data = data[year];

    var t = d3.transition()
        .duration(2000);

    var months = csv_data.map(function(d) {
        return d.month;
    });
    x_scale.domain(months);

    var max_value = d3.max(csv_data, function(d) {
        return +d.value;
    });

    y_scale.domain([0, max_value]);
    colour_scale.domain([0, max_value]);

    var bars = svg.selectAll('.bar')
        .data(csv_data)

    bars
        .exit()
        .remove();

    var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) {
            return x_scale(d.month);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale(+d.value);
        })
        .attr('height', function(d) {
            return height - y_scale(+d.value)
        })
        .attr('fill', function(d) {
            return colour_scale(+d.value);
        })

    svg.select('.x.axis')
        .call(x_axis);

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}


var slider = d3.select('#year');
slider.on('change', function() {
    draw(this.value);
});
  }

  render() {

 
    let pigPopulation = <tr><td>Loading</td></tr>;

    if (this.props.data) {

      pigPopulation = this.props.data["PIG POPULATIONS"].map((datum, index) => (<tr key={index}>
        <td>{datum.year} x</td>
        <td>{datum.island}</td>
        <td>{datum.pigPopulation}</td>
      </tr>))

console.log(pigPopulation);

    }
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <form>
        <label for="year">Please select a year: </label>
        <label for="year">Please select a year: </label>
        <input type="range" 
            min={2009} max={2014} 
            step={1} id="year" 
            value={2014} 
            onChange={this.handleChange}
             />
        <datalist id="tickmarks" />
 
        {/* <output name={selected_year} id={selected_year}>2014</output> */}
    </form>
    <div id="vis" ></div>

        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <th>Island</th>
              <th>Population</th>
            </tr>
            {pigPopulation}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
 
});

const mapStateToProps = state =>{ 
  console.log(state)
  return({
   data: state.pigPopulationInHawaii.pigPopulation 
  });}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

