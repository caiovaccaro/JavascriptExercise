import ModelHelper from 'helpers/model';
import _ from 'lodash';

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
	return JSON_CALL
		.then(this.get('menu'))
		.then(this.filter)
		.then(this.process)
};

export default () => Model.fromJSON('/api/menu/data.json')