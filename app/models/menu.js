// async, promise based, framework agnostic, Model adapter, with url mangling
function getModel(){
	return  (function(context, getJSON, undefined){
		var ModelFactoy = function(data){
			var processItem = function(item, link, menu, parent){
				var path = 'path';
				if(item[path]){
					item.url  = ( (parent.url ?  parent.url + '/' : '') + item[path] ).replace(' ', '-');
					// item.slug = item.url.replace(new RegExp('/', 'g'), '_'); //fallback
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

			var data = process(data.menu)


			return {
				data:     data,
				find:     function(prop, value){return findProp(data, prop,   value)},
				// findSlug: function(slug       ){return findProp(data, 'slug', slug )}, //fallback
				findUrl:  function(url        ){return findProp(data, 'url',  url  )}
			}
		};

		var ModelSetter = function(data){
			return context.Model = ModelFactoy(data);
		}

		return Promise.resolve(getJSON('/api/menu/data.json'))
			.then(ModelSetter)
	})(window, jQuery.getJSON)
};
