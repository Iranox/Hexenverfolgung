var DataLoader = function(){
	this.loadExecutions(){
		console.log("Hi");
		return jQuery.getJSON("json/executions.json");
	}
	return this;
}