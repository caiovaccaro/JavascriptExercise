import React from 'react';
import ViewsLoader from '../viewsLoader';

var Imagery = React.createClass({
  getInitialState: function() {
    return {title: 'Imagery'};
  },
  render: function() {
    return (
      <h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
  identifier: 'imagery',
  component: Imagery
});

export default Imagery;