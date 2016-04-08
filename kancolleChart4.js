


//may need to change margins
var margin = {top: 30, right: 10, bottom: 10, left: 0},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


var x = d3.scale.ordinal().rangePoints([0, width], 1),
    y = {},
    dragging = {};

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background;
	

//creating the svg with width and height
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
var legendsvg = d3.select("#legend").append("svg")
	.attr("width", 800)
    .attr("height", 70);


var shipListsvg = d3.select("#shipList").append("svg")
	.attr("width", 200)
	.attr("height", 200);


var ship	

var filterArray = [0,1,2,3,4,5,6];

var constructionArray = [["dd1", "30/30/30/30"],
						["dd2", "30/30/999/30"],
						["cl1", "250/30/200/30"],
						["cl2", "250/30/200/31"],
						["cl3", "250/130/200/30"],
						["cl4", "250/30/250/30"],
						["cl5", "250/31/200/30"],
						["cvl1", "300/30/400/330"],
						["cvl2", "300/300/600/600"],
						["cv1", "300/30/400/300"],
						["cv2", "350/30/600/350"], 
						["cv3", "301/31/502/400"], 
						["bb1", "400/30/600/30"], 
						["bb2","400/100/600/30"]]

var shipTypeArray = ["DD", "CL", "CA", "BB", "CVL", "CV", "SS"];


//Remember to change the colors of the legend, they are wrong right now
var colors = [["DD", "Destroyer", "#8dd3c7"],
			["CL", "Light Cruiser", "#bebada"],
			["CA", "Heavy Cruiser", "#fb8072"],
			["BB", "Battleship", "#80b1d3"],
			["CVL", "Light Carrier", "#b3de69"],
			["CV", "Carrier", "#F57FBE"],
			["SS", "Submarine", "#fccde5"]];
	
//csv file here. When changing make sure to change cars to kancolle or ships
function createVis() {
  d3.csv("kancolle.csv", function(kancolle) {

  // Extract the list of dimensions and create a scale for each.
  // kancolle is the array of ship objects.
  // d3.keys are the keys of each element in the object. So the stat names and the construction rates
  x.domain(dimensions = d3.keys(kancolle[0]).filter(function(d) {
	  //return dimensions that are not name or type or in the filterArray
  
	//return d != "name" && d != "type" && isInArray(d3.keys(kancolle[0]).indexOf(d), filterArray) && (y[d] = d3.scale.linear()
	var selected;
	if(d != "name" && d != "type") {
		var found = findRecipe(d, constructionArray)
		if(found != null){
			var element = "#" + found;
			//console.log(element);
			selected = d3.select(element).property("checked");
			//console.log(selected);
		}
		else{
			var element = "#" + d;
			//console.log(element);
			selected = d3.select(element).property("checked");
			//console.log(selected);
		}
	}
	else 
		selected = false;
	
	
	return selected && (y[d] = d3.scale.linear()

		//extent returns the minimum and maximum value in the given array using natural order
        .domain(d3.extent(kancolle, function(p) { return +p[d]; }))
        .range([height, 0]));
  }));
  
	background = svg.append("g")
		.attr("class", "background")
		.selectAll("path");
  //grey lines and blue foreground lines are added.
  // Add grey background lines for context.
var ddCheck = d3.select("#dd").property("checked");
	if(ddCheck == true) {		
	background = svg.append("g")
		.attr("class", "background")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "DD";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var clCheck = d3.select("#cl").property("checked");
	if(clCheck == true)	{
	  background
		.data(kancolle.filter(function (d){
			return d.type == "CL" || d.type == "CLT";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var caCheck = d3.select("#ca").property("checked");
	if(caCheck == true)	{		
	  background
		.data(kancolle.filter(function (d){
			return d.type == "CA" || d.type == "CAV";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var bbCheck = d3.select("#bb").property("checked");
	if(bbCheck == true)	{
		
	  background
		.data(kancolle.filter(function (d){
			return d.type == "BB" || d.type == "BBV";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var cvlCheck = d3.select("#cvl").property("checked");
	if(cvlCheck == true){	
	  background
		.data(kancolle.filter(function (d){
			return d.type == "CVL";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var cvCheck = d3.select("#cv").property("checked");
	if(cvCheck == true)	{	
	  background
		.data(kancolle.filter(function (d){
			return d.type == "CV";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	
	var ssCheck = d3.select("#ss").property("checked");
	if(ssCheck == true)	{
	  background
		.data(kancolle.filter(function (d){
			return d.type == "SS";
		}))
		.enter().append("path")
		  .attr("d", path);
	}
	

  //has an example of filtering by type. I can change the color of the lines for different ship types
  // Add blue foreground lines for focus.
	if(ddCheck == true) {
	  ddForeground = svg.append("g")
		.attr("class", "ddForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "DD";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
		
	}
	
	if(clCheck == true)	{
	  clForeground = svg.append("g")
		.attr("class", "clForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "CL" || d.type == "CLT";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	if(caCheck == true)	{
	  caForeground = svg.append("g")
		.attr("class", "caForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "CA" || d.type == "CAV";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	if(bbCheck == true)	{
	  bbForeground = svg.append("g")
		.attr("class", "bbForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "BB" || d.type == "BBV";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	if(cvlCheck == true){	
	  cvlForeground = svg.append("g")
		.attr("class", "cvlForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "CVL";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	if(cvCheck == true)	{	
	  cvForeground = svg.append("g")
		.attr("class", "cvForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "CV";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	if(ssCheck == true)	{	
	  ssForeground = svg.append("g")
		.attr("class", "ssForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.type == "SS";
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
	}
	
	svg.selectAll("path")
		.append("svg:title")
		.text(function(d) {
			return d.name;
		});

  // Add a group element for each dimension.
  //This is the dragging code to filter 
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
	  .attr("id", function(d){ return d;})
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return {x: x(d)}; })
        .on("dragstart", function(d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          ddForeground.attr("d", path);
		  clForeground.attr("d", path);
		  caForeground.attr("d", path);
		  bbForeground.attr("d", path);
		  cvlForeground.attr("d", path);
		  cvForeground.attr("d", path);
		  ssForeground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(ddForeground).attr("d", path);
		  transition(clForeground).attr("d", path);
		  transition(caForeground).attr("d", path);
		  transition(bbForeground).attr("d", path);
		  transition(cvlForeground).attr("d", path);
		  transition(cvForeground).attr("d", path);
		  transition(ssForeground).attr("d", path);
          background
              .attr("d", path)
            .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));


  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
      .style("text-anchor", "middle")
	  .style("font-size", "16px")
      .attr("y", -9)
      .text(function(d) { return d; })
	.attr("id", function(d) {
		return d;
	});


  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);	
	
	});
}
function setup() {
	d3.selectAll("input").property('checked', false);
	d3.selectAll(".shipType").property("checked", true);
	d3.select("#dd1").property("checked", true);
	d3.select("#Firepower").property("checked", true);
	d3.select("#Torpedo").property("checked", true);
	d3.select("#Anti_Air").property("checked", true);
}


function updateVis(){
	svg.selectAll("*").remove();
	legendsvg.selectAll("*").remove();
	createLegend();
	createVis();
}

function resetVis() {
	svg.selectAll("*").remove();
	legendsvg.selectAll("*").remove();
	setup();
	createLegend();
	createVis();
	
}

function oneShip(ship) {
	svg.selectAll(".ddForeground").remove();
	svg.selectAll(".clForeground").remove();
	svg.selectAll(".caForeground").remove();
	svg.selectAll(".bbForeground").remove();
	svg.selectAll(".cvlForeground").remove();
	svg.selectAll(".cvForeground").remove();
	svg.selectAll(".ssForeground").remove();
	d3.csv("kancolle.csv", function(kancolle){
		ddForeground = svg.append("g")
		.attr("class", "ddForeground")
		.selectAll("path")
		.data(kancolle.filter(function (d){
			return d.name == ship.name;
		}))
		.enter().append("path")
		.attr("d", path)
		.on("click", function(d) {
			console.log(d.name);
			fillInfoBox(d);
			
		});
		
	});
}


function fillInfoBox(ship) {
	console.log(ship)
	document.getElementById("shipName").value = ship.name;
	
	d3.select("#fpValue").text(ship.Firepower);
	d3.select("#torpValue").text(ship.Torpedo);
	d3.select("#aaValue").text(ship.Anti_Air);
	d3.select("#aswValue").text(ship.Anti_Sub);
	d3.select("#losValue").text(ship.LoS);
	d3.select("#luckValue").text(ship.Luck);
	d3.select("#hpValue").text(ship.Health);
	d3.select("#armorValue").text(ship.Armor);
	d3.select("#evaValue").text(ship.Evasion);
	d3.select("#planeValue").text(ship.Planes);
	d3.select("#fCostValue").text(ship.Fuel_Cost);
	d3.select("#aCostValue").text(ship.Ammo_Cost);
	
}

function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}

function brushstart() {
  d3.event.sourceEvent.stopPropagation();
}


// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
	  //console.log("actives: " + actives);
	  //console.log("extents: " + extents);
  ddForeground.style("display", function(d) {	  
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });

  clForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
  caForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
  bbForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
  cvlForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
  cvForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
  ssForeground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
}


//isInArray to see if element is in array
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function findRecipe(value, array) {
	var result;
	for( var i = 0, len = array.length; i < len; i++ ) {
		if( array[i][1] == value ) {
			result = array[i][0];
			break;
		}
	}
	return result;
}

//good for removing from array
function remove(element, array) {
	var index = array.indexOf(element);
	if(index > -1)
		array.splice(index, 1);
	
}

//create buttons or checkboxes later for filtering
function createButtons() {
	
	//creates event for the chart buttons
	/*
	var updateBtn = d3.select("#updateBtn");
	updateBtn.on("click", function() {
		updateVis();
	});*/
	
	var resetBtn = d3.select("#resetBtn");
	resetBtn.on("click", function() {
		resetVis();
	});
	
	var searchBtn = d3.select("#searchBtn");
	searchBtn.on("click", function() {
		var name = shipName.value;
		d3.csv("kancolle.csv", function(kancolle) {
			kancolle.filter(function(d){
				if(name == d.name){
					fillInfoBox(d);
					oneShip(d);
				}
			});
		});
	});
	
	d3.selectAll("input").on("change", function(){
		updateVis();
	});
	
	//Creates the events for the buttons in the Ship Type column
	/*var dd = d3.select("#dd");
	dd.on("change", function(d){
		updateVis();
	});
	
	var cl = d3.select("#cl");
	cl.on("change", function(d){
		updateVis();
	});
	
	var ca = d3.select("#ca");
	ca.on("change", function(d){
		updateVis();
	});
	
	var bb = d3.select("#bb");
	bb.on("change", function(d){
		updateVis();
	});
	
	var cvl = d3.select("#cvl");
	cvl.on("change", function(d){
		updateVis();
	});
	
	
	var cv = d3.select("#cv");
	cv.on("change", function(d){
		updateVis();
	});
	
	var ss = d3.select("#ss");
	ss.on("change", function(d){
		updateVis();
	});	*/
	
	//After this point, it creates the events for the checkboxes in Ship Stats column
	/*
	var firepower = d3.select("#Firepower");
	firepower.on("change", function(d){
		updateVis();
	});
	
	var torpedo = d3.select("#Torpedo");
	torpedo.on("change", function(d){
		updateVis();
	});
	
	var antiair = d3.select("#Anti-Air");
	antiair.on("change", function(d){
		updateVis();
	});
	
	var antisub = d3.select("#Anti-Sub");
	antisub.on("change", function(d){
		updateVis();
	});

	var los = d3.select("#LoS");
	los.on("change", function(d){
		updateVis();
	});
	
	var luck = d3.select("#Luck");
	luck.on("change", function(d){
		updateVis();
	});
	
	var hp = d3.select("#Health");
	hp.on("change", function(d){
		updateVis();
	});
	
	var armor = d3.select("#Armor");
	armor.on("change", function(d){
		updateVis();
	});
	
	var evasion = d3.select("#Evasion");
	evasion.on("change", function(d){
		updateVis();
	});
	
	var plane = d3.select("#Planes");
	plane.on("change", function(d){
		updateVis();
	});
	
	var fCost = d3.select("#Fuel_Cost");
	fCost.on("change", function(d){
		updateVis();
	});
	
	var aCost = d3.select("#Ammo_Cost");
	aCost.on("change", function(d){
		updateVis();
	});*/
	
	
	/*Checkboxes for Construction Recipes*/
	/*var dd1 = d3.select("#dd1");
		dd1.on("change", function(d){
		updateVis();
	});
	
	var dd2 = d3.select("#dd2");
		dd2.on("change", function(d){
		updateVis();
	});
	
	var cl1 = d3.select("#cl1");
		cl1.on("change", function(d){
		updateVis();
	});
	
	var cl2 = d3.select("#cl2");
		cl2.on("change", function(d){
		updateVis();
	});
	
	var cl3 = d3.select("#cl3");
		cl3.on("change", function(d){
		updateVis();
	});
	
	var cl4 = d3.select("#cl4");
		cl4.on("change", function(d){
		updateVis();
	});
	
	var cl5 = d3.select("#cl5");
		cl5.on("change", function(d){
		updateVis();
	});
	
	var cvl1 = d3.select("#cvl1");
		cvl1.on("change", function(d){
		updateVis();
	});
	
	var cvl2 = d3.select("#cvl2");
		cvl2.on("change", function(d){
		updateVis();
	});
	
	var cv1 = d3.select("#cv1");
		cv1.on("change", function(d){
		updateVis();
	});
	
	var cv2 = d3.select("#cv2");
		cv2.on("change", function(d){
		updateVis();
	});
	
	var cv3 = d3.select("#cv3");
		cv3.on("change", function(d){
		updateVis();
	});
	
	var bb1 = d3.select("#bb1");
		bb1.on("change", function(d){
		updateVis();
	});
	
	var bb2 = d3.select("#bb2");
		bb2.on("change", function(d){
		updateVis();
	});*/
	
	/*After this point, its making events for the select all/clear all buttons*/
	var saType = d3.select("#SAType");
	saType.on("click", function() {
		d3.selectAll(".shipType").property("checked", true);
		updateVis();
	});
	
	var caType = d3.select("#CAType");
	caType.on("click", function() {
		d3.selectAll(".shipType").property("checked", false);
		updateVis();
	});
	
	
	var saStat = d3.select("#SAStat");
	saStat.on("click", function() {
		d3.selectAll(".shipStat").property("checked", true);
		updateVis();
	});
	
	var caStat = d3.select("#CAStat");
	caStat.on("click", function() {
		d3.selectAll(".shipStat").property("checked", false);
		updateVis();
	});
	
	
	//updateVis();
	var saConstruction = d3.select("#SAConstruction");
	saConstruction.on("click", function() {
		d3.selectAll(".construction").property("checked", true);
		updateVis();
	});
	
	var caConstruction = d3.select("#CAConstruction");
	caConstruction.on("click", function() {
		d3.selectAll(".construction").property("checked", false);
		updateVis();
	});

}

function createLegend() {
	//create the legend lines
	
	var half_length = Math.ceil(colors.length/2);
	var leftSide = colors.slice(0, half_length);
	var rightSide = colors.slice(half_length, colors.length);
	//console.log(leftSide);
	//console.log(rightSide);
	
	var legend = legendsvg.append("g");
	legend
		.selectAll("rect")
		.data(leftSide.filter(function (d){
			return isInArray(d[0],shipTypeArray);
		}))
		.enter()
		.append("rect")
		.attr("class", "legendBlocks")
		.attr("width", 20)
		.attr("height", 3)
		.attr("x", function(d, i){
			return i * 200 +15;
		})
		.attr("y", 20)
		.style("fill", function(d){
			return d[2];
		});	
		//create the legend text
	legend.selectAll('text')
		.data(leftSide.filter(function (d){
			return isInArray(d[0],shipTypeArray);
		}))
		.enter()
		.append("text")
		.attr("class", "legendText")
		.attr("x", function(d, i){
			return i * 200 + 47;
		})
		.attr("y", 25)
		.text(function(d){return d[1];});
	
	
	var legend2 = legendsvg.append("g");
	legend2.selectAll("rect")
		.data(rightSide.filter(function (d){
			return isInArray(d[0],shipTypeArray);
		}))
		.enter()
		.append("rect")
		.attr("class", "legendBlocks")
		.attr("width", 20)
		.attr("height", 3)
		.attr("x", function(d, i){
			return i * 200 + 15;
		})
		.attr("y", 50)
		.style("fill", function(d){
			return d[2];
		});
	
	
	legend2.selectAll('text')
		.data(rightSide.filter(function (d){
			return isInArray(d[0],shipTypeArray);
		}))
		.enter()
		.append("text")
		.attr("class", "legendText")
		.attr("x", function(d, i){
			return i * 200 + 47;
		})
		.attr("y", 55)
		.text(function(d){return d[1];});
}


setup();
createButtons();
createVis();
createLegend();