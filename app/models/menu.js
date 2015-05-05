
var MenuModel = new ModelHelper();

MenuModel.filter = function(data){
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

MenuModel.create = function(JSON_CALL){
	return Promise
		.resolve(JSON_CALL)
		.then(this.get('menu'))
		.then(this.filter)
		.then(this.process)
};

App.Menu = function(){
	var url = '/api/menu/data.json';
	var JSON_CALL = jQuery.getJSON(url)
	return MenuModel.create(JSON_CALL)
}
