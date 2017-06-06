var Timeline = function(svg, executions, range){
    var timeline = d3.select(svg);
    var execMap = [];
    var maxExPYe = 0; //Maximum of executions per Year
    var width = 400,
        height = 200;
    init();

    function init(){
        createYearMap(executions);
        drawData();
        drawLine();
    }

    function createYearMap(data){
        var index = 0;
        var yearMap = [];
        for(var x in data){
            index = data[x];
            if(yearMap[index] === undefined){
               yearMap[index] = 0;
            }
            yearMap[index]++;
        }
        for(var x in yearMap){
            execMap.push([x, yearMap[x]]);
            if(maxExPYe < (yearMap[x]*1)){
                maxExPYe = yearMap[x]*1;
            }
        }
    };

    function drawData(){
        var scaleHeight = d3.scaleLinear().domain([0, maxExPYe]).range([0, 100]);
        var scaleXpos = d3.scaleLinear().domain([range.start*1, range.end*1]).range([0, 100]);
        timeline.attr("width", width)
            .attr("height", height);
        var bar = timeline.selectAll("g")
            .data(execMap)
            .enter().append("rect")
                .attr("x", function(d){return -scaleXpos(d[0]) + "%"})
                .attr("y", "-100%")
                .attr("transform", "rotate(180)")
                .attr("width", 1)
                .attr("height", function(d){return scaleHeight(d[1]) + "%";});
    };

    function drawLine(){
        timeline.append("line")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "100%")
            .attr("y2", "100%")
            .attr("style", "stroke:rgb(0, 0, 0); stroke-width:3px; z-index:1");
    }
    return this;
};