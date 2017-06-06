var Timeline = function(executions){
    var range = [1400, 1800];
    var executions = [1405, 1506, 1788, 1533, 1777, 1567, 1456, 1576, 1456, 1435, 1533, 1533, 1533, 1456, 1456, 1777, 1777, 1777, 1630, 1630, 1630, 1630, 1630, 1630, 1630, 1630, 1630];
    var execMap = [];
    var maxExPYe = 0; //Maximum of executions per Year
    var number = 0;
    execMap.addData = function(data){
        var index = 0;
        var yearMap = [];
        for(x in data){
            index = data[x];
            if(yearMap[index] == undefined){
               yearMap[index] = 0;
            }
            yearMap[index]++;
        }
        for(x in yearMap){
            execMap.push([x, yearMap[x]]);
            if(maxExPYe < (yearMap[x]*1)){
                maxExPYe = yearMap[x]*1
            }
        }
    }
    execMap.addData(executions);
    var width = 400,
        height = 200;
    console.log("max: " + maxExPYe);
    var scaleHeight = d3.scaleLinear().domain([0, maxExPYe]).range([0, height]);
    var scaleXpos = d3.scaleLinear().domain([range[0], range[1]]).range([0, width]);
    var timeline = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
    var bar = timeline.selectAll("g")
        .data(execMap)
        .enter().append("g")
             .attr("transform", function(d, i) {console.log(d[0]*1 + " Xpos: " + scaleXpos(d[0]*1)); return "translate(" + scaleXpos(d[0]*1) + ", 200) rotate(180)"});
    console.log("number: " + number);
    bar.append("rect")
        .attr("width", 1)
        .attr("height", function(d){return scaleHeight(d[1])});
		
	return this;
};