import jQuery from 'jquery';
import _TC from 'ember-template-compiler';
import _Ember from 'ember';

import Router from 'app/router';
import * as Routes from 'routes/all';
import * as Views from 'views/all';

// front-end
import * as UI from 'ui/all';

var init = function(){
	var App = Ember.Application.create();

	Router
		.setup(App)
		.register(Routes)
		.register(Views)

	return App;
};

export { init }
