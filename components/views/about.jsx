import React from 'react'
import ViewsLoader from '../viewsLoader'

var About = React.createClass({
	getInitialState: function() {
		return {title: 'About this document'};
	},
	render: function() {
    return (
    	<h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
	identifier: 'about',
	component: About
});

export default About;