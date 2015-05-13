// generate url from nested object
var process = function(menu, _parent){
	var path = 'path'
	var parent = _parent || {}
	for (var link in menu){
		if(menu.hasOwnProperty(link)){
			var item = menu[link]
			if(item[path]){
				item.url = ( (parent.url ?  parent.url + '/' : '') + item[path] ).replace(' ', '-')
			}
			if(item.menu){
				process(item.menu, item)
			}
		}
	}
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

// legacy pseudoUrl resolution
// TODO: delete this
var enablePseudoUrl = function(data){
	var findProp = function(array, prop, value){
		var result = false
		for(var i = 0; i < array.length; i++){
			var object = array[i];
			result = (object[prop] === value) ? object : (object.menu ? findProp(object.menu, prop, value) : false);
			if(result){
				break;
			}
		}
		return result;
	};

	return {
		data:     data,
		find:     function(prop, value){return findProp(data, prop,   value)},
		findUrl:  function(url        ){return findProp(data, 'url',  url  )}
	};
}

export {process, wrap, enablePseudoUrl}
