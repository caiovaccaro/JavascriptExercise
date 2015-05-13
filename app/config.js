System.config({
	transpiler: 'babel',
	baseURL: '/public/js/',
	paths: {
		'helpers/*': '/app/helpers/*.js',
		'routes/*': '/app/routes/*.js',
		'models/*': '/app/models/*.js',
		'app/*': '/app/*.js'
	},
	map:{
		'lodash': 'lodash/lodash',
		'babel': 'babel/browser',
		'jquery': 'jquery/jquery-1.10.2',
		'ember': 'ember/ember.debug',
		'ember-template-compiler': 'ember/ember-template-compiler',
		'ember/resolver': 'ember-resolver/ember-resolver',
		'hbs': 'system/plugin-ember-hbs'
	}
});