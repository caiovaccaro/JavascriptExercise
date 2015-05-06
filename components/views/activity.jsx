import Q from 'q'
import React from 'react';
import ViewsLoader from '../viewsLoader.jsx!';

var deferred, Activity

deferred = Q.defer()

Activity = {
  component: React.createClass({
    componentDidMount: function() {
      if(!this.props.url) return false;

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
          deferred.resolve()
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
      if(!this.state) return false

      return (
        <h1>{this.state.data.index.title}</h1>
      );
    }
  }),
  render: function(url) {
    var Component = this.component

    React.render(
      <Component url={url} />,
      document.getElementById('content')
    );

    return deferred.promise
  }

}
ViewsLoader.registerView({
  identifier: 'activity',
  component: Activity
});

export default Activity;