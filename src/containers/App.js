import React, {
  Component
} from "react";
import "./App.css";
import {
  connect
} from 'react-redux';
import * as d3 from "d3";
import {
  changeActiveYear
} from "../redux/actions";


class App extends Component {
  constructor(props) {
    super(props);
    // this.drawPlot = this.drawPlot.bind(this);
  }

  componentDidMount() {

  
  }

  componentDidUpdate() {
    console.log(this.props.years, "WHAAAAAAAAT")
    if (this.props.years){
      console.log("MAKE CHART")
      this.createBarChart();
    }
  }

  createBarChart() {
    console.log(this.props.years, "#bar chart")
    var timer = 0; // * TMP
    var formatDateIntoYear = d3.timeFormat("%Y");
    var formatDate = d3.timeFormat("%Y");
    var parseDate = d3.timeParse("%m/%d/%y");
    

    var startDate =     new Date(this.props.years[0], 0, 1, 0, 0, 0, 0),
      endDate =  new Date(this.props.years[this.props.years.length-1], 1, 1, 0, 0, 0, 0);

    var margin = {top:50, right:50, bottom:0, left:50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        
// refresh page to prevent duplicates
  d3.selectAll("svg").remove();

  // var svg = d3.select("#vis")
  //     .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom);  

      var svg = d3.select('#vis')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');
  
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
  ////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");
    
var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

    slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue)); 
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")

    ////////// plot //////////

var dataset
console.log(dataset, 'here')

var textvalueofLabel = d3.select('.label')
console.log(textvalueofLabel)

if (this.props.segData) {
  dataset = this.props.segData;

  console.log(this.props.segData, "SEG")
  console.log(formatDate(startDate))
  console.log(dataset[formatDate(startDate)], "DATASET")
  if (this.props.segData) {

    console.log(Object.keys(dataset), dataset[2000], "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

  }

}

var plot = svg.append("g")
    .attr("class", "plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//initialize barchart
  if (dataset){
    // drawPlot(dataset[this.props.years[0]]);
console.log(dataset[this.props.years[0]])
  }
  playButton
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() == "Pause") {
      moving = false;
      clearInterval(timer);
      // timer = 0;
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 2000); 
      button.text("Pause");
    }
    console.log("Slider moving: " + moving);
  })
// })

function prepare(d) {
  d.id = d.id;
  d.date = parseDate(d.date);
  return d;
}
  
function step() {
  update(x.invert(currentValue));
  currentValue = currentValue + (targetValue/5);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}

function drawPlot(x) {
  
  console.log(x, "THIIIIS")
 
  var csv_data = x;

    var t = d3.transition()
        .duration(2000);

    var months = csv_data.map(function(d) {
      console.log(csv_data, "DATAAA")
        return d.island;
    });
    x_scale.domain(months);

    var max_value = d3.max(csv_data, function(d) {
        return +d.population;
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

function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));
console.log(formatDate(h), h, "DATEEEE")
console.log(dataset[formatDate(h)], "DATEEEE")

  // filter data set and redraw plot
  // reassign data
  

  var newData = dataset[formatDate(h)].filter(function(d) {
    return d.date < h;
  })

  // drawPlot(newData);
}
  }

  render() {


      let pigPopulation = <tr><td>Loading</td></tr> ;

      if (this.props.data) {

        pigPopulation = this.props.data["PIG POPULATIONS"].map((datum, index) => ( 
        <tr key = {index } >
            <td> {datum.year } x </td>
            <td> {datum.island} </td> 
            <td>{ datum.pigPopulation}</td>
         </tr>))

            console.log(pigPopulation);

          }
          return ( 
            <div className = "App" >
            <div id="vis">
              <button id="play-button">Play</button>
            </div>
            <table>
            <tbody>
            <tr>
              <th> Year </th> 
              <th> Island </th> 
              <th> Population </th> 
            </tr> 
            {pigPopulation}
             </tbody> 
            </table> 
            </div>
          );
        }
      }

      const mapDispatchToProps = dispatch => ({
        changeActiveYear: () => dispatch(changeActiveYear()),

      });

      const mapStateToProps = state => {
        console.log(state)
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
      )(App);