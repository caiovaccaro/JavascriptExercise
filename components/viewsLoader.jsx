import Q from 'q'
import React from 'react';

var deferred, ViewsLoader

deferred = Q.defer()

ViewsLoader = (function() {
  var views = {},
    menuEl = '#menu'

  function registerView(data) {
    if(!data.identifier) return false;

    views[data.identifier] = data;
  };

  function setActiveView(data) {
    var Component, links, url

    empty();

    if(!views[data.route]) return false;
    if(!views[data.route].component) return false;

    Component = views[data.route].component
    url = 'api/' + data.route + '/data.json'

    links = document.querySelectorAll(menuEl + ' a.active');

    for (var i = links.length - 1; i >= 0; i--) {
      links[i].className = '';
    };

    document.querySelector(menuEl + ' a[data-route=' + data.route + ']').className = 'active';

    Q(Component.render(url)).then(function() {
      deferred.resolve()
    })

    return deferred.promise
  };

  function empty() {
    document.getElementById('content').innerHtml = '';
  };

  function receiver(data) {
    setActiveView(data);
    return deferred.promise
  };

  return {
    registerView: registerView,
    receiver: receiver
  }
}());

export default ViewsLoader;