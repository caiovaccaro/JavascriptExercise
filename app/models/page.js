import ModelHelper from 'models/helper';

var Model = new ModelHelper();

Model.create = function(JSON_CALL){
	return Promise
		.resolve(JSON_CALL)
		.then(this.get('index'))
};

export default function(url){
	var url = '/api/'+url+'/data.json';
	var JSON_CALL = jQuery.getJSON(url)
	return Model.create(JSON_CALL)
};