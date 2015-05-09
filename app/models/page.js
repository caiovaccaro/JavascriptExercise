import ModelHelper from 'models/helper';
import getJSON from 'ajax/json';

var Model = new ModelHelper();

Model.create = function(JSON_CALL){
	return JSON_CALL
		.then(this.get('index'))
};

export default function(url){
	var url = '/api/'+url+'/data.json';
	var JSON_CALL = getJSON(url);
	return Model.create(JSON_CALL);
};