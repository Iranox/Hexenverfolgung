try{

var WitchMap = function(source, radiusFunction, clusterOffset){
    if(radiusFunction === undefined){
        radiusFunction = function(x){return x*100000;};
    }
    if(clusterOffset === undefined){
        clusterOffset = 50000;
    }
    function createMap(layer){
        var map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: source
                }),
                layer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([-30.0, 45.0]),
                zoom: 3
            })
        });
    }

    function refineData(data){
        var longData = data.concat().sort(function(a, b){return a.long - b.long;});
        var latData = data.concat().sort( function(a, b){return a.lat - b.lat;});
        for(var i in longData){
            longData[i].longOrder = i;
            latData[i].latOrder = i;
        }

        return [longData, latData];
    }

    function cluster(data){
        var currentCluster = {
            count : 0,
            objects : [],
            long : -1,
            lat : -1,
            longSum : 0,
            latSum : 0
        };
        var dataLength = data[0].length;
        for(var i = 0; i < dataLength; i++){

        }
        return data[0];
    }

    function checkClusterMember(obj, data, dataLength){
        var longForward, latForward = 1;
        var longBackward, latBackward = 1;
        
    }

    function aggregateCluster(){

    }

    function createVectorLayer(data){
        var center;
        var circles = [];
        var features = [];
        var styles = [];
        var stackSize = 0;
        var vectorSource = new ol.source.Vector({});
        for(var i in data){
            center = ol.proj.fromLonLat([data[i].long, data[i].lat]);
            circles.push(new ol.geom.Circle(center, radiusFunction(1)));
            features.push(new ol.Feature(circles[stackSize]));
            styles.push(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#FF0000',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: [255, 0, 0, .1]//"rgba(255, 0, 0, 0.1)"
                })
            }));
            features[stackSize].setStyle(styles[stackSize]);
            stackSize++;
        }
        vectorSource.addFeatures(features);
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
//            style: styles
        });

        return vectorLayer;
    }

    this.init = function(data){
        var ref_data = refineData(data);
        var clusters = cluster(ref_data);
        createMap(createVectorLayer(clusters));
    };

    return this;
};

}catch(e){
    console.log(e.message, "from", e.lineNumber, e.stack);
    throw e;
}