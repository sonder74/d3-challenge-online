
////////////////////////////////////////////////////////////////
// Startup code
////////////////////////////////////////////////////////////////

// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// Define chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 130,
  left: 100
};

// Define dimensions of chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Locate site for chart in HTML, append SVG, and set dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Create area within SVG for chart
var chartGroup = svg.append("g")
  .attr("class", "chart")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load source data, make data promise, and push data to initial array
d3.csv("data.csv").then(function(data) {
  var healthData = data;

  // Format the data
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.obesity = +data.obesity;

  });

  // Create scales
  var xScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty) - 2, d3.max(healthData, d => d.poverty) + 2])
    .range([0, chartWidth]);

  var yScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.healthcare) - 2, d3.max(healthData, d => d.healthcare) + 2])
    .range([chartHeight, 0]);

  // Create axes
  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)

  // Set x-axis to bottom of chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .attr("id", "xAxis")
    .call(xAxis);
    
  // Set y-axis to left of chart
  chartGroup.append("g")
    .attr("id", "yAxis")
    .call(yAxis);

  // Append data and create plot
  chartGroup.selectAll("dot")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("class", "stateCircle")
    .attr("cx", function(d) {return xScale(d.poverty);})
    .attr("cy", function(d) {return yScale(d.healthcare);})

  // Append dot labels
  var dot_labels = chartGroup.selectAll(null)
    .data(healthData)
    .enter()
    .append("text");

  dot_labels
    .attr("font-family", "sans-serif")
    .attr("font-weight", 700)
    .attr("font-size", "8px")
    .attr("fill", "white")
    .attr("x", function(d) {return xScale(d.poverty) - 5.5;})
    .attr("y", function(d) {return yScale(d.healthcare) + 3;})
    .attr("id", "dot_label")
    .text(function(d) {return d.abbr;});

  // Append x-axis labels and event listeners
  chartGroup.append("text")
    .attr("class", "aText")
    .attr("class", "active")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight * 1.1)
    .attr("id", "in_poverty")
    .text("In Poverty (%)")
    .on("click", poverty_click);

  chartGroup.append("text")
    .attr("class", "aText")
    .attr("class", "standby")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight * 1.15)
    .attr("id", "age")
    .text("Age (Median)")
    .on("click", age_click);

  chartGroup.append("text")
    .attr("class", "aText")
    .attr("class", "standby")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight * 1.2)
    .attr("id", "household_income")
    .text("Household Income (Median)")
    .on("click", income_click);

  // Append y-axis labels and event listeners
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "4em")
    .attr("class", "aText")
    .attr("font-weight", 800)
    .attr("class", "active")
    .attr("id", "lacks_healthcare")
    .text("Lacks Healthcare (%)")
    .on("click", healthcare_click);

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "2.75em")
    .attr("class", "aText")
    .attr("class", "standby")
    .attr("id", "smokes")
    .text("Smokes (%)")
    .on("click", smokes_click);

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1.5em")
    .attr("class", "aText")
    .attr("class", "standby")
    .attr("id", "obese")
    .text("Obese (%)")
    .on("click", obese_click);


  ////////////////////////////////////////////////////////////////
  // Tooltips (failed to implement)
  ////////////////////////////////////////////////////////////////

  // // Initialize tooltips
  // var toolTips = d3.tip()
  //   .attr("class", "tooltip")
  //   // .offset([80, -60])
  //   .html(function(d) {
  //     return (`${d.state}<br>Poverty: ${d.poverty}%<br>Lacks Healthcare: ${d.healthcare}%`);
  // });

  // // Create tooltips
  // chartGroup.call(toolTips);

  // // Create event listeners
  // chartGroup.selectAll("circle")
  //   .on("mouseover", function(d) {
  //     toolTips.show(d, this)
  //   })
  //   .on("mouseout", function(d) {
  //     toolTips.hide(d)
  //   });
    
  
  
  ////////////////////////////////////////////////////////////////
  // Click-handling functions
  ////////////////////////////////////////////////////////////////

  
  // Create function for handling poverty click
  function poverty_click() {

    // Transition axis labels
    chartGroup.selectAll("#in_poverty")
      .attr("class", "active")
    chartGroup.selectAll("#age").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.15)
      .attr("id", "age")
      .text("Age (Median)");
    chartGroup.selectAll("#household_income").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.2)
      .attr("id", "household_income")
      .text("Household Income (Median)");

    // Transition x-axis
    var xScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.poverty) - 2, d3.max(healthData, d => d.poverty) + 2])
      .range([0, chartWidth]);
    var xAxis = d3.axisBottom(xScale);
    d3.select("#xAxis")
      .transition()
      .duration(2000)
      .call(xAxis);

    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function(d) {return xScale(d.poverty);});
    chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("x", function(d) {return xScale(d.poverty) - 5.5;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);

  };

  // Create function for handling age click
  function age_click() {
      
    // Transition axis labels
    chartGroup.selectAll("#age")
      .attr("class", "active")
    chartGroup.selectAll("#in_poverty").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.1)
      .attr("id", "in_poverty")
      .text("In Poverty (%)");
      chartGroup.selectAll("#household_income").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.2)
      .attr("id", "household_income")
      .text("Household Income (Median)");
    
    // Transition x-axis
    var xScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.age) - 2, d3.max(healthData, d => d.age) + 3])
      .range([0, chartWidth]);
    var xAxis = d3.axisBottom(xScale);
    d3.select("#xAxis")
      .transition()
      .duration(2000)
      .call(xAxis);
    
    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function(d) {return xScale(d.age);});
    chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("x", function(d) {return xScale(d.age) - 5.5;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);
  
  };

  // Create function for handling income click
  function income_click() {

    // Transition axis labels
    chartGroup.selectAll("#household_income")
      .attr("class", "active")
    chartGroup.selectAll("#in_poverty").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.1)
      .attr("id", "in_poverty")
      .text("In Poverty (%)");
    chartGroup.selectAll("#age").remove();
    chartGroup.append("text")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight * 1.15)
      .attr("id", "age")
      .text("Age (Median)");
    
    // Transition x-axis
    var xScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.income) - 1500, d3.max(healthData, d => d.income)])
      .range([0, chartWidth]);
    var xAxis = d3.axisBottom(xScale);
    d3.select("#xAxis")
      .transition()
      .duration(2000)
      .call(xAxis);
    
    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function(d) {return xScale(d.income);});
    chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("x", function(d) {return xScale(d.income) - 5.5;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);
        
  };

  // Create function for handling healthcare click
  function healthcare_click() {

    // Transition axis labels
    chartGroup.selectAll("#lacks_healthcare")
      .attr("class", "active")
    chartGroup.selectAll("#smokes").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "2.75em")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "smokes")
      .text("Smokes (%)");
    chartGroup.selectAll("#obese").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1.5em")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "obese")
      .text("Obese (%)");
      
    // Transition y-axis
    var yScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.healthcare) - 2, d3.max(healthData, d => d.healthcare) + 2])
      .range([chartHeight, 0]);
    var yAxis = d3.axisLeft(yScale);
    d3.select("#yAxis")
      .transition()
      .duration(2000)
      .call(yAxis);
      
    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cy", function(d) {return yScale(d.healthcare);});
      chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("y", function(d) {return yScale(d.healthcare) + 3;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);

  };


  // Create function for handling smokes click
  function smokes_click() {

    // Transition axis labels
    chartGroup.selectAll("#smokes")
      .attr("class", "active")
    chartGroup.selectAll("#lacks_healthcare").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "4em")        
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "lacks_healthcare")
      .text("Lacks Healthcare (%)");
    chartGroup.selectAll("#obese").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1.5em")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "obese")
      .text("Obese (%)");
      
    // Transition y-axis
    var yScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.smokes) - 2, d3.max(healthData, d => d.smokes) + 2])
      .range([chartHeight, 0]);
    var yAxis = d3.axisLeft(yScale);
    d3.selectAll("#yAxis")
      .transition()
      .duration(2000)
      .call(yAxis);
      
    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cy", function(d) {return yScale(d.smokes);});
      chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("y", function(d) {return yScale(d.smokes) + 3;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);

  };

  // Create function for handling obese click
  function obese_click() {

    // Transition axis labels
    chartGroup.selectAll("#obese")
      .attr("class", "active")
    chartGroup.selectAll("#lacks_healthcare").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "4em")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "lacks_healthcare")
      .text("Lacks Healthcare (%)");
    chartGroup.selectAll("#smokes").remove();
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "2.75em")
      .attr("class", "aText")
      .attr("class", "standby")
      .attr("id", "smokes")
      .text("Smokes (%)");
      
    // Transition y-axis
    var yScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d.obesity) - 2, d3.max(healthData, d => d.obesity) + 2])
      .range([chartHeight, 0]);
    var yAxis = d3.axisLeft(yScale);
    d3.selectAll("#yAxis")
      .transition()
      .duration(2000)
      .call(yAxis);
      
    // Transition plot
    chartGroup.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cy", function(d) {return yScale(d.obesity);});
      chartGroup.selectAll("#dot_label")
      .transition()
      .duration(2000)
      .attr("y", function(d) {return yScale(d.obesity) + 3;});

    // Add event listeners
    chartGroup.selectAll("#in_poverty")
      .on("click", poverty_click);
    chartGroup.selectAll("#age")
      .on("click", age_click);
    chartGroup.selectAll("#household_income")
      .on("click", income_click);
    chartGroup.selectAll("#lacks_healthcare")
      .on("click", healthcare_click);
    chartGroup.selectAll("#smokes")
      .on("click", smokes_click);
    chartGroup.selectAll("#obese")
      .on("click", obese_click);

  };

});
