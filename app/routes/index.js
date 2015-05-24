export default Ember.Route.extend({
	redirect: function(){
		this.transitionTo('page', 'welcome')
	}
});
