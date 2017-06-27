var DataLoader = window.DataLoader || {};
var DataLoader = function(defaultFunction){
    var callbackFunction = defaultFunction;
    this.setCallbackFunction = function(callback){
        callbackFunction = callback;
    };
    this.loadExecutions = function(){
        d3.json("json/executions.json", function(json){
            callbackFunction(json);
        });
    };
    this.loadExecutionsAsyn = function(){
        console.log("execute");
        console.log("undefined?: " + $);
        $.get("/api/controller/Witch.php?all", function(response){
            console.log("response");
            console.log(response);
            console.log(response[0].Vorname)
        });
    };
    return this;
};
window.DataLoader = DataLoader;