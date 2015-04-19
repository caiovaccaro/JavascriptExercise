import React from 'react'
import ViewsLoader from '../viewsLoader'

var Typography = React.createClass({
	getInitialState: function() {
		return {title: 'Typography'};
	},
	render: function() {
    return (
    	<h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
	identifier: 'typography',
	component: Typography
});

export default Typography;