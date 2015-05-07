import ModelHelper from 'models/helper';

var Model = new ModelHelper();

Model.filter = function(data){
	var removeDisabled = function(object){
		return _.filter(object, function(link){
			if(link.menu){
				link.menu = removeDisabled(link.menu);
			}
			return link.status !== "disabled";
		});
	};
	return removeDisabled(data)
}

Model.create = function(JSON_CALL){
	return Promise
		.resolve(JSON_CALL)
		.then(this.get('menu'))
		.then(this.filter)
		.then(this.process)
};

export default function(){
	var url = '/api/menu/data.json';
	var JSON_CALL = jQuery.getJSON(url);
	return Model.create(JSON_CALL);
};