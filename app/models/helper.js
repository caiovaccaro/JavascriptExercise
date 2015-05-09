import getJSON from 'ajax/json';

export default function(){
	this.addMethods = function(data){
		var findPropInObject = function(object, prop, value){
			return (object[prop] === value) ? object : (object.menu ? findProp(object.menu, prop, value) : false)
		};

		var findProp = function(array, prop, value){
			var result = false
			for(var i = 0; i < array.length; i++){
				var object = array[i];
				result = findPropInObject(object, prop, value);
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

	this.process = function(data){
		var processItem = function(item, link, menu, parent){
			var path = 'path';
			if(item[path]){
				item.url  = ( (parent.url ?  parent.url + '/' : '') + item[path] ).replace(' ', '-');
			}
		};

		var process = function(menu, parent){
			for (var link in menu){
				if(menu.hasOwnProperty(link)){
					var item = menu[link];
					processItem(item, link, menu, (parent || {}) );
					if(item.menu){
						process(item.menu, item)
					}
				}
			}
			return menu;
		};

		return process(data)
	}


	this.get = prop => data => data[prop];

	this.fromJSON = function(url){
		var JSON_CALL = getJSON(url);
		return this.create(JSON_CALL);
	}

	this.wrap = function(prop){
		return function(data){
			var obj = {}
			obj[prop] = data;
			return obj;
		}
	}

	return this;
};
