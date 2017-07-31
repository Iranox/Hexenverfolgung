var Timeline = function(div, exData, split){
    var range = {};
    var startingPoints;
    var maxStackValueAbsolute;
    var timeline = d3.select(div);
    var graphContainer = timeline.append("div");
        graphContainer.attr("style", "position:absolute; top:25px; left:40px; bottom: 25px; right:25px; z-index: 1;");
    var graphSVG = graphContainer.append("svg");
        graphSVG.attr("height","100%").attr("width", "100%").style({background: "none"});
    if(timeline.style("position") === "static"){
        timeline.style("position","relative");  //TODO throw error
    }
    if(split === undefined){
        split = false;
    }
    var dataLabel = timeline.append("p");
        dataLabel.attr("style", "position:absolute; bottom:0px; left:50%; height:25px; margin:0px")
            .html("XXXX:YY");
    var startLabel = timeline.append("p");
        startLabel.attr("style", "position:absolute; bottom:0px; left:0px; height:25px; margin:0px");

    var EndLabel = timeline.append("p");
        EndLabel.attr("style", "position:absolute; bottom:0px; right:0px; height:25px; margin:0px");

    var sideLine = timeline.append("div")
            .attr("style", "position:absolute; top:25px; left:0px; bottom:25px; right: 25px; background: none; z-index: 0;")
            .append("svg").attr("style","background: none;")
                .attr("style", "height:100%; width:100%; background:none;");
    var sideLineText = timeline.append("div").attr("style", "position:absolute; top:25px; left:0px; bottom:25px; width: 40px; background: none; z-index: 0;");
    init(exData);

    var refreshFunctions = []; //TODO Improve

    function drawSideLine(){
        sideLine.html("");
        sideLineText.html("");
        var height = maxStackValueAbsolute/10;
        var exponent = 0;
        while(height > 1){
            exponent++;
            height = height/10;
        }
        var step = Math.pow(10, exponent);
        if(Math.floor((maxStackValueAbsolute/step)) <= 1){
            step = step /10;
        }
        var scaleHeight = d3.scaleLinear().domain([0, maxStackValueAbsolute]).range([0, 100]);
        var currentHeight = step;
        while(currentHeight < maxStackValueAbsolute){
            sideLine.append("line")
                .attr("x1", "37px")
                .attr("x2", "100%")
                .attr("y1", scaleHeight(currentHeight)+ "%")
                .attr("y2", scaleHeight(currentHeight)+ "%")
                .attr("style", "stroke:rgb(125, 125, 125); stroke-width:1px;");
            sideLineText.append("div")
                .attr("style", "color: rgb(125, 125, 125); position: absolute; right:0px; left:0px; margin:0px; padding:0px; bottom: " + scaleHeight(currentHeight) + "%")
                .append("p")
                    .attr("style", "position: absolute; right:5px; margin:0px; padding:0px; bottom: -8px;" )
                    .html(currentHeight);
            currentHeight = currentHeight*1 + step*1;
        }
        sideLine.append("line")
            .attr("x1", "39px")
            .attr("x2", "39px")
            .attr("y1", "0%")
            .attr("y2", "100%")
            .attr("style", "stroke:rgb(0, 0, 0); stroke-width:2px;");
    }
    function init(exData){
        graphSVG.html("");
        var data = wrap_data(exData);
        maxStackValueAbsolute = maxStackValueAbsolute || data.maxStackValue;
        prepareData(data);
        drawSideLine(data);
        drawData(data, 1);
        drawLine();
        $('[data-toggle="tooltip"]').tooltip();
    }

    function prepareData(data){
        range.start = data.start*1 - (data.start*1 % 100);
        range.end = data.end + 100 - (data.end % 100);
        startLabel.html(range.start);
        EndLabel.html(range.end);
        setStartingPoints();
    }

    function setStartingPoints(){
        startingPoints = {};
        startingPoints.get = function(x){
            if(this[x] === undefined){
                return -100*1;
            }else{
                return this[x];
            }
        };
    };

    this.drawTripleData = function(data){
        setStartingPoints();
        graphSVG.html("");
        var data0 = wrap_data(data[0]);
        var data1 = wrap_data(data[1]);
        var data2 = wrap_data(data[2]);
        var maxStackValue = data0.maxStackValue + data1.maxStackValue + data2.maxStackValue;
        data0.maxStackValue = maxStackValue;
        data1.maxStackValue = maxStackValue;
        data2.maxStackValue = maxStackValue;
        prepareData(data0);
        var start = Math.min(data0.start*1, Math.min(data1.start*1, data2.start*1));
        var end = Math.max(data0.end*1, Math.max(data1.end*1, data2.end*1));
        range.start = start*1 - (start*1 % 100);
        range.end = end*1 + 100 - (end*1 % 100);
        if(data0.length > 0){
            drawData(data0, 1);
        }
        if(data1.length > 0){
            drawData(data1, 2);
        }
        if(data2.length > 0){
            drawData(data2, 3);
        }
        drawLine();
        $('[data-toggle="tooltip"]').tooltip({'container': 'body', 'placement':  'top'});
    };

    function drawData(data, priority){
        var scaleHeight = d3.scaleLinear().domain([0, maxStackValueAbsolute]).range([0, 100]);
        var scaleXpos = d3.scaleLinear().domain([range.start*1, range.end*1]).range([0, 100]);
        var bar = graphSVG.selectAll(".WitchValue" + priority)
            .data(data)
            .enter().append("rect")
                .attr("x", function(d){return -scaleXpos(d[0]) + "%";})
                .attr("y", function(d){return startingPoints.get(d[0]) + "%";})
                .attr("transform", "rotate(180)")
                .attr("width", 3)
                .attr("height", function(d){startingPoints[d[0]] = startingPoints.get(d[0]) + scaleHeight(d[1].stack*1); return scaleHeight(d[1].stack*1) + "%";})
                .attr("class", "WitchValue" + priority)
                .attr("data-toggle", "tooltip")
                .attr("data-placement", "top")
                .attr("title", function(d){return "Number of processes in the year " + d[0] + " : " + d[1].stack;})
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
        $(this).css({fill: "gold"})
        dataLabel.html(d[0] + ":" + d[1].stack*1);
    };

    function resetDataLabel(){
        $(this).css({fill: ""})
        dataLabel.html("Year: YY");
    }

    function activateRefresh(data){
        for(var x in refreshFunctions){
            refreshFunctions[x](data);
        }
    }

    this.redraw = function(data){
        init(data);
    //    activateRefresh(data);
    };

    this.onRefreshPush = function(x){
        refreshFunctions.push(x);
    };

    return this;
};