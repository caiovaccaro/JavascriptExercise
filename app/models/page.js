// async, promise based, framework agnostic, Model adapter, with url mangling
var PageModel = new ModelHelper();
PageModel.create = function(JSON_CALL){
	return Promise
		.resolve(JSON_CALL)
		.then(this.get('index'))
};

App.Page = function(url){
	var url = '/api/'+url+'/data.json';
	var JSON_CALL = jQuery.getJSON(url)
	return PageModel.create(JSON_CALL)
}
