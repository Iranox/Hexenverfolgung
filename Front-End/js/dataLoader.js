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
        $.get("/api/controller/Witch.php?all", function(response){
            callbackFunction(response);
        }, 'json');
    };
    return this;
};
window.DataLoader = DataLoader;