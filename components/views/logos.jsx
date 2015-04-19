import React from 'react'
import ViewsLoader from '../viewsLoader'

var Logos = React.createClass({
	getInitialState: function() {
		return {title: 'Logos'};
	},
	render: function() {
    return (
    	<h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
	identifier: 'logos',
	component: Logos
});

export default Logos;