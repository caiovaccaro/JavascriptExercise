import _ from 'lodash';

import setRouter from 'app/router';
import * as Routes from 'routes/all';

var init = function(){
	var App = Ember.Application.create();
	setRouter(App);
	_.assign(App, Routes);
	
	return App;
};


export { init }
