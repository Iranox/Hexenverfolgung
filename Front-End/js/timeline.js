var Timeline = function(div, exData){
    var executions = wrap_data(exData);
    var range = {};
    range.start = executions.start*1 - (executions.start*1 % 100);
    range.end = executions.end - (executions.end % 100);
    var timeline = d3.select(div);
    var graphContainer = timeline.append("div");
        graphContainer.attr("style", "position:absolute; top:25px; left:25px; bottom: 25px; right:25px;");
    var graphSVG = graphContainer.append("svg");
        graphSVG.attr("height","100%").attr("width", "100%");
    if(timeline.style("position") === "static"){
        timeline.style("position","relative");  //TODO throw error
    }
    var dataLabel = timeline.append("p");
        dataLabel.attr("style", "position:absolute; bottom:0px; left:50%; height:25px; margin:0px")
            .html("XXXX:YY");
    var startLabel = timeline.append("p");
        startLabel.attr("style", "position:absolute; bottom:0px; left:0px; height:25px; margin:0px");
        startLabel.html(range.start);
    var EndLabel = timeline.append("p");
        EndLabel.attr("style", "position:absolute; bottom:0px; right:0px; height:25px; margin:0px");
        EndLabel.html(range.end);
    init();

    var refreshFunctions = []; //TODO Improve

    function init(){
        drawData();
        drawLine();
    }

    function drawData(){
        var scaleHeight = d3.scaleLinear().domain([0, executions.maxStackValue]).range([0, 100]);
        var scaleXpos = d3.scaleLinear().domain([range.start*1, range.end*1]).range([0, 100]);
        var bar = graphSVG.selectAll("g")
            .data(executions)
            .enter().append("rect")
                .attr("x", function(d){return -scaleXpos(d[0]) + "%";})
                .attr("y", "-100%")
                .attr("transform", "rotate(180)")
                .attr("width", 3)
                .attr("height", function(d){return scaleHeight(d[1].stack*1) + "%";})
                .on("mouseover", refreshDataLabel)
                .on("mouseout", resetDataLabel)
                .on("click", function(d){ activateRefresh(d[1].processes);});
    };

    function drawLine(){
        graphSVG.append("line")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "100%")
            .attr("y2", "100%")
            .attr("style", "stroke:rgb(0, 0, 0); stroke-width:3px; z-index:1");
    };

    function refreshDataLabel(d){
        dataLabel.html(d[0] + ":" + d[1].stack*1);
    };

    function resetDataLabel(){
        dataLabel.html("XXXX:YY");
    }

    function activateRefresh(data){
        for(var x in refreshFunctions){
            refreshFunctions[x](data);
        }
    }

    this.onRefreshPush = function(x){
        refreshFunctions.push(x);
    };
    return this;
};