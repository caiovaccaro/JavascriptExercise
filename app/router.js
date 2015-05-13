export default {
	setup: function(App){
		App.Router.map(function() {
			this.route('page', { path: '/*page_url' });
		});

		App.Router.reopen({
		  location: 'auto'
		});
	}
}
