import _ from 'lodash';
export default {
	App: {},
	setup: function(App){
		this.App = App;
		this.App.Router.map(function() {
			this.route('page', { path: '/*page_url' });
		});
		this.App.Router.reopen({
			location: 'auto'
		});
		return this
	},
	register: function(Routes){
		_.assign(this.App, Routes);
		return this;
	}
}
