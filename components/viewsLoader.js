import React from 'react';

var ViewsLoader = (function() {
  var views = {};

  function registerView(data) {
    if(!data.identifier) return false;

    views[data.identifier] = data;
  };

  function setActiveView(data) {
    empty();

    if(!views[data.route]) return false;
    if(!views[data.route].component) return false;

    var component = React.createElement(views[data.route].component);

    React.render(
      component,
      document.getElementById('content')
    );
  };

  function empty() {
    document.getElementById('content').innerHtml = '';
  };

  function receiver(data) {
    setActiveView(data);
  };

  return {
    registerView: registerView,
    receiver: receiver
  }
}());

export default ViewsLoader;