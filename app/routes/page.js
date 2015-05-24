import Page from 'models/page';

export default Ember.Route.extend({
	model: params => Page(params.page_url),
	setupController: function(controller, model){
		this._super(controller, model);
		Ember.run.schedule('afterRender', this, 'navigate');
	},
	navigate: function(){
		$('.sidebar').sidebar().refresh();
	}

});
