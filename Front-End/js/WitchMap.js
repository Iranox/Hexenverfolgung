try{

var WitchMap = function(source, radiusFunction, clusterOffset){
    var refreshFunctions = [];
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

        map.on("click", function(e) {
            map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                var data = [];
                var features = feature.get('features');
                for(var i = 0; i < features.length; i++){
                    data.push(features[i].execution);
                    activateRefresh(data);
                }
            });
        });
    }

    function createVectorLayer(data){
        var center;
        var circles = [];
        var features = [];
        var stackSize = 0;
        var vectorSource = new ol.source.Vector({});
        for(var i in data){
            if(data[i].Coordinaten === undefined || String(data[i].Coordinaten.lat).trim() === "" || String(data[i].Coordinaten.lon).trim() === ""){
                continue;
            }
            center = ol.proj.fromLonLat([data[i].Coordinaten.lon*1, data[i].Coordinaten.lat*1]);
            circles.push(new ol.geom.Point(center));
            features.push(new ol.Feature(circles[stackSize]));
            features[stackSize].execution = data[i];
            stackSize++;
        }
        vectorSource.addFeatures(features);
        var clusterSource = new ol.source.Cluster({
            distance: 50,
            source: vectorSource
        });
        var styleCache = {};
        var vectorLayer = new ol.layer.Vector({
            source: clusterSource,
            style: function(feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if (!style) {
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#FF0000'
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 0, 0, 0.1)'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#000000'
                            })
                        })
                    });
                styleCache[size] = style;
                }
                return style;
            }
        });

        return vectorLayer;
    }

    this.init = function(data){
        createMap(createVectorLayer(data));
    };

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

}catch(e){
    console.log(e.message, "from", e.lineNumber, e.stack);
    throw e;
}