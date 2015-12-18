import ModelHelper from 'helpers/model';

var Model = new ModelHelper();

Model.create = function(JSON_CALL){
	return JSON_CALL
		.then(this.get('index'))
};

export default url => Model.fromJSON('/api/'+url+'/data.json')
