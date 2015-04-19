import React from 'react';
import ViewsLoader from '../viewsLoader';

var Updates = React.createClass({
  getInitialState: function() {
    return {title: 'Updates'};
  },
  render: function() {
    return (
      <h1>{this.state.title}</h1>
    );
  }
});

ViewsLoader.registerView({
  identifier: 'updates',
  component: Updates
});

export default Updates;