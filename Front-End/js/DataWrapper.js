var wrap_data = function(data, type){

    function createYearMap(data){
        var index = 0;
        var yearMap = {};
        var execMap = [];
        var maxExPYe = 0;
        var yearRangeStart = Number.MAX_VALUE;
        var yearRangeEnd = Number.MIN_VALUE;
        for(var x in data){
            index = data[x]["Jahr"];
            if(index === "" || index === undefined){
                continue;
            }
            if(yearMap[index] === undefined){
               yearMap[index] = {stack : 0, processes: []};
            }
            yearMap[index].stack++;
            yearMap[index].processes.push(data[x]);
        }
        for(var x in yearMap){
            execMap.push([x, yearMap[x]]);
            if(maxExPYe < (yearMap[x].stack*1)){
                maxExPYe = yearMap[x].stack*1;
            }
            if(yearRangeStart > x*1 && x !== "" && x !== undefined){
                yearRangeStart = x*1;
            }

            if(yearRangeEnd < x*1){
                yearRangeEnd = x*1;
            }
        }
        execMap.maxStackValue = maxExPYe;
        if(isNaN(yearRangeStart)){
            yearRangeStart = Number.MAX_VALUE;
        }
        execMap.start = yearRangeStart;
        execMap.end = yearRangeEnd;
        return execMap;
    };
    switch (type){
        case "year first":
            return createYearMap(data); //in case another format has to be produced, inset here
            break;
        default:
            return createYearMap(data);
    }
};