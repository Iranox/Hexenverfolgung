var wordcloud, size = [600, 350];

var TagCloud = function (div,head) {
    var refreshFunctions = [];
    var witchData;
    function loadedTagCloud(data) {
        witchData = data;
        d3.layout.cloud().size([800, 300])
            .words(prepareData(data))
            .text(function(d) { return d.text; })
            .rotate(0)
            .fontSize(function (d) {
                return d.size;
            })
            .padding(2)
            .on("end", draw)
            .start();
    }

    this.drawCloud = function(data){
        loadedTagCloud(data);
    };

    function toList(data){
        var list = [];
        for(var p in data){
            list = list.concat([data[p]]);
        }
        return list;
    }

    function prepareData(data) {
        var wordList = [];
        for(var i = 0; i < data.length;i++){
           var witchRow =  data[i][head].split("|");
           for (var j = 0; j < witchRow.length;j++){
               var tagCloudValue;
               var word = witchRow[j].trim();
               if(word in wordList){
                   tagCloudValue  = {
                       "text": word,
                       "size": wordList[word].size + 1,
                   };
               } else {
                 tagCloudValue  = {
                       "text": word,
                       "size": 10
                   };

               }
               wordList[word] = tagCloudValue;

           }
        }
        return toList(wordList);
    }


    function draw(words) {
        wordcloud = d3.select(div)
            .append("svg")
            .attr("width", size[0])
            .attr("height", size[1])
            .append("g")
            .attr("transform", "translate(" + (size[0] / 2) + "," + (size[1] / 2) + ")");

        wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            })
            .transition()
            .each(function () {
                d3.select(this).on("click", function (d) {
                    activateRefresh(getChoosenData(d.text))
                });
            });
    }

    function getChoosenData(data){
        var result = [];
        for(var i = 0; i < witchData.length;i++){
            if(witchData[i][head].indexOf(data) !== -1){
               result =  result.concat([witchData[i]])
            }
        }
        return result;
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
}