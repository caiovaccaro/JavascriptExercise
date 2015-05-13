// generate url from nested object
var process = function(menu, _parent){
	var path = 'path'
	var parent = _parent || {}
	for (var link in menu){
		if(menu.hasOwnProperty(link)){
			var item = menu[link]
			if(item[path]){
				item.url = ( (parent.url ? parent.url + '/' : '') + item[path] ).replace(' ', '-')
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

export {process, wrap}
