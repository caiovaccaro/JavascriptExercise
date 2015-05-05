App.PageRoute = Ember.Route.extend({
	model: function(params) {
		return App.Page(params.page_url)
	}
});