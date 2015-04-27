App = Ember.Application.create();

App.Router.map(function() {
	// this.route('page', { path: '/page/:page_url' });
	this.route('page', { path: '/page/*page_url' }); //supports slashed urls
});

App.Router.reopen({
  location: 'auto'
});

App.PageRoute = Ember.Route.extend({
	model: function(params) {
		return getModel().then(function(Model){return Model.findUrl(params.page_url) })
	},
	serialize: function(model) {
		return { post_url: model.get('url') };
	}
});

App.ApplicationRoute = Ember.Route.extend({	
	model: function() {
		return getModel().then(function(Model){return Model.data});
	}
});

App.IndexRoute = Ember.Route.extend({	
	model: function() {
		return {text: "JavascripExercise"}
	}
});