import Page from 'models/page';

export default Ember.Route.extend({
	model: params => Page(params.page_url)
});
