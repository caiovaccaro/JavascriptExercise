var enumerate = function(menu, _data){
	var data = _data || {index: 1};
	_.forOwn(menu, function(item, link){
		item.id = data.index++;
		if(item.menu){
			enumerate(item.menu, data)
		}
	});
	return menu
}


// wrap a value inside an object property
var wrap = function(prop){
	return function(data){
		var obj = {}
		obj[prop] = data
		return obj
	}
}

export {wrap, enumerate}
