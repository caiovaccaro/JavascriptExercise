import React from 'react';
import ViewsLoader from '../viewsLoader';

var Color = React.createClass({
  getInitialState: function() {
    return {title: 'Color'};
  },
  render: function() {
    return (
      <h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
  identifier: 'color',
  component: Color
});

export default Color;