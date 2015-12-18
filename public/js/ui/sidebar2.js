import jQuery from 'jquery';

export default function(el){
	var $el = $(el);
	var module = {
		getStateFromDom: function(){
			$el.children().find($el.find('a.active').parents('[data-status=dropdown]')).attr('data-closed', 'false');
			return this;
		},
		init: function(){
			return this
				.getStateFromDom();
		}
	};
	return module.init();
}
