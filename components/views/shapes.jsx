import React from 'react';
import ViewsLoader from '../viewsLoader';

var Shapes = React.createClass({
  getInitialState: function() {
    return {title: 'Shapes'};
  },
  render: function() {
    return (
      <h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
  identifier: 'shapes',
  component: Shapes
});

export default Shapes;