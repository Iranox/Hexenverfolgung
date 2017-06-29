var TableDrawer = function(div, data, head){
    var table = d3.select(div).append("table");
        table.attr("class", "table-striped table-bordered")
            .attr("style", "width:100%; height: 100%");
        table.append("thead").append("tr").selectAll("th")
            .data(head)
            .enter()
            .append("th")
            .html(function(d){return d[0];});

    function bodyContent(data){
        table.append("tbody").selectAll("tr").data(data).enter()
            .append("tr")
            .html(readHeadData);
    }
    function readHeadData(d){
        var td = "";
        var result="";
        for(var x in head){
            result = "";
            for(var y in head[x][1]){
                if(d[head[x][1][y]] !== undefined){
                    result += d[head[x][1][y]] + " ";
                }
            }
            if (result.length !== 0){
                td += "<td>" + result + "</td>";
            }else{
                td += "<td></td>";
            }
        }
        return td;
    }
    bodyContent(data);
    this.redrawData = function(data){
        table.html("");
        bodyContent(data);
    };
    return this;
};

