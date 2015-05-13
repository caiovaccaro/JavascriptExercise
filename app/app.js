import _ from 'lodash';

import jQuery from 'jquery';
import _TC from 'ember-template-compiler';
import _Ember from 'ember';

import setRouter from 'app/router';
import * as Routes from 'routes/all';

var init = function(){
	var App = Ember.Application.create();
	setRouter(App);
	_.assign(App, Routes);
	
	return App;
};


export { init }
