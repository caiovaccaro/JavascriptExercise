App = Ember.Application.create();

App.Router.map(function() {
	this.route('page', { path: '/*page_url' });
});

App.Router.reopen({
  location: 'auto'
});
