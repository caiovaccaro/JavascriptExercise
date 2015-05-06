import $ from 'jquery'
import Q from 'q'
import _ from 'lodash'
import React from 'react'
import Mediator from '../lib/mediator'

var deferred, Menu

deferred = Q.defer()

Menu = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
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
  handleClick: function(event) {
    if(!event.currentTarget.dataset.route) return false;

    Mediator.publish('menuClick', {
      route: event.currentTarget.dataset.route,
      path: event.currentTarget.dataset.path,
      status: event.currentTarget.parentNode.className
    });
  },
  render: function() {
    if(!this.state.data.menu && !this.props.data) return false;

    var _this = this,
      data = this.props.data ? this.props.data : this.state.data.menu,
      menu

    data = _.filter(data, function(item) {
      return item.status === 'enabled' || item.status === 'dropdown'
    })

    menu = data.map(function(item) {
      var link, dropdown

      if(item.status === 'dropdown' && !_.filter(item.menu, { status: 'enabled' }).length) return false

      item.path = '#!' + item.path;

      link = item.route ?
              <a href={item.path} data-route={item.route} data-path={item.path} onClick={_this.handleClick}>{item.text}</a> :
              <a href="#" onClick={_this.handleClick}>{item.text}</a>;

      dropdown = item.status === 'dropdown' ?
                  <Menu data={item.menu}/> :
                  null;

      return (
        <li className={item.status}>{link}{dropdown}</li>
      );
    });

    return (
      <ul>{menu}</ul>
    );
  }
});

function renderMenu() {
  Q(React.render(
    <Menu url="api/menu/data.json"/>,
    document.getElementById('menu')
  ))

  return deferred.promise
}

export default renderMenu