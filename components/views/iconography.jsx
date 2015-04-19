import React from 'react';
import ViewsLoader from '../viewsLoader';

var Iconography = React.createClass({
  getInitialState: function() {
    return {title: 'Iconography'};
  },
  render: function() {
    return (
      <h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
  identifier: 'iconography',
  component: Iconography
});

export default Iconography;