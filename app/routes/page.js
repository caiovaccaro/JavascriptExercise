import Page from 'models/page';

export default Ember.Route.extend({
	model: function(params) {
		return Page(params.page_url)
	}
});