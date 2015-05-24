export default Ember.View.extend({
	tagName: 'aside',
	classNames: ['sidebar'],
	render: function(context){
		this._super(context);
		Ember.run.scheduleOnce('afterRender', this, 'initPlugin');
	},
	initPlugin: function(){
		var instance = $(this.element).sidebar();
		this.set('pluginInstance', instance);
	},
	actions:{
		expand: function(id){
			// alert('wexpand: '+ id);
			// console.log(this);
			var instance = this.get('pluginInstance');
			instance.userToggle(id);
			return false;
		},
		next: function(){
			var instance = this.get('pluginInstance');
			instance.pagination.next();
			return false;
		},
		previous: function(){
			var instance = this.get('pluginInstance');
			instance.pagination.prev();
			return false;
		}

		
	}
});
