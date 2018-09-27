import React, { Component } from "react";
import "./components.css";
import { connect } from 'react-redux';
import * as d3 from "d3";
import { setInitialYear } from "../redux/actions";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
  }


  componentDidUpdate() {
    if (this.props.years){
      if (this.props.initialYear === null  ) {
        // || this.props.years.indexOf(this.props.initialYear.getFullYear()) === -1
        this.props.setInitialYear(new Date(this.props.years[0], 0, 1));
      } else if (this.props.years.indexOf(this.props.initialYear.getFullYear()) === -1) {
        // invalid year
        this.props.setInitialYear(new Date(this.props.years[0], 0, 1));
        
      }

      this.createBarChart();
    }
  }

  createBarChart() {

    let timer = 0; // * TMP
    const formatDateIntoYear = d3.timeFormat("%Y");
    const formatDate = d3.timeFormat("%Y");

    const startDate = new Date(this.props.years[0], 0, 1);
    const endDate =  new Date(this.props.years[this.props.years.length-1], 1, 1);

    const margin = {top:50, right:50, bottom:0, left:50},
        width = 1100 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        
// refresh page to prevent duplicates
    d3.selectAll("svg").remove();
      // barchart
    const svg = d3.select('#vis_barchart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('width', width-100)
      .attr('height', height-100)      
      .attr('class', 'main_group')
 
      .attr('transform', 'translate(' + margin.left + ',' + 0 + ')');

      // slider
    const svg_slider = d3.select('#vis_slider')
      .append('svg')
      .attr('width', width-200)
      .attr('height', height/4)
      .append('g')
      .attr('transform', 'translate(' + 0 + ',' + 0 + ')');
  
    // barchart X/Y scale
    const x_scale = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    const y_scale = d3.scaleLinear().range([height, 0]);

    const colour_scale = d3.scaleQuantile()
      .range([ "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"]);

    const y_axis = d3.axisLeft(y_scale);
    const x_axis = d3.axisBottom(x_scale);


    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')');

    svg.append('g')
        .attr('class', 'y axis');


  ////////// slider //////////

    let moving = false;
    // find the index of the initialYear from URL query
    let currentValue = 0; // default value

 
    
    const targetValue = 800;

    const playButton = d3.select("#play-button");
        
    const x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue])
        .clamp(true);
        
    const slider = svg_slider.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + 5 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay");

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(5))
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDateIntoYear(d); });

    const handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9)
        // .attr("cx", x(2000));
        .attr("cx", x(this.props.initialYear));

    const label = svg.append("text")  
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("x", width-100 + "px")

        .text(formatDate(this.props.initialYear))

    ////////// plot

    let dataset

    if (this.props.segData) {
      dataset = this.props.segData;
    }

  
  const drawPlot = (data, year) => {

      const  mouseleave = d => {
        d3.selectAll(".d3_tooltip_bar_chart").remove();
      }

      
      const  mouseover = d => {
    
        const tooltip = d3
          .select("#vis_barchart")
          .append("div")
          .attr("class", "d3_tooltip_bar_chart");

      
        tooltip.append("span").attr("id", "d3_details");

        tooltip
          .style("top", d3.event.layerY + "px")
          .style("left", d3.event.layerX + "px");

        tooltip.select("#d3_details").html(
          `
          <strong>${d.island}: ${d.population} 🐷</strong>
        <br />
          `
        );
  }

    let csv_data = data[year];

    const t = d3.transition()
        .duration(2000);

    const island = csv_data.map(function(d) {
        return d.island;
    });
    
    x_scale.domain(island);

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
            return x_scale(d.island);
        })
        .attr('width', x_scale.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)

    new_bars.merge(bars)
        .transition(t)
        .attr('y', function(d) {
            return y_scale(+d.population);
        })
        .attr('height', function(d) {
            return height - y_scale(+d.population)
        })
        .attr('fill', function(d) {
            return colour_scale(+d.population);
        })

    svg.select('.x.axis')
        .call(x_axis);

    svg.select('.y.axis')
        .transition(t)
        .call(y_axis);

}

    //initialize barchart
  if (dataset && this.props.initialYear && (this.props.years.indexOf(this.props.initialYear.getFullYear()) !== -1)){
      drawPlot(dataset, formatDate(this.props.initialYear));
  } else if (dataset && this.props.initialYear) {
      drawPlot(dataset, this.props.years[0]);

  }

  // button event
  playButton
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() === "Pause") {
      moving = false;
      clearInterval(timer);
      // timer = 0;
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 2000);     // 2 seconds
      button.text("Pause");
    }
  })
  const step = () => {
    console.log("moving: ", moving)
    if (!this.flag && this.props.initialYear){
      this.flag = true;
      const idx = this.props.years.indexOf(this.props.initialYear.getFullYear()) + 1;
      currentValue = idx * Math.ceil(parseInt(targetValue, 10)/parseInt(this.props.years.length-1, 10))
    }
    
    update(x.invert(currentValue));
    currentValue = currentValue + (parseInt(targetValue, 10)/parseInt(this.props.years.length-1, 10));
  
    if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    playButton.text("Play");
  }
}

const update = (h) => {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .text(formatDate(h));


  // filter data set and redraw plot
  // reassign data
  drawPlot(dataset, formatDate(h));
 
}
  }

  render() {

     
          return ( 
            <div id="vis_barchart">
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
          segData: state.pigPopulationInHawaii.segregatedData,
          initialYear: state.pigPopulationInHawaii.initialYear
        });
      }

      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(BarChart);