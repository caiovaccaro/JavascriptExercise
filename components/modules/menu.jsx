import $ from 'jquery';
import React from 'react';
import Mediator from '../lib/mediator';

var Menu = React.createClass({
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleClick: function(event) {
    if(!event.currentTarget.dataset.route) return false;
    
    var links = document.querySelectorAll('#menu a.active');

    for (var i = links.length - 1; i >= 0; i--) {
      links[i].className = '';
    };

    event.currentTarget.className = 'active';

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
      menu = data.map(function(item) {
        item.path = '#!' + item.path;

        var link = item.route ?
                    <a href={item.path} data-route={item.route} data-path={item.path} onClick={_this.handleClick}>{item.text}</a> :
                    <a href="#" onClick={_this.handleClick}>{item.text}</a>;

        var dropdown = item.status === 'dropdown' ?
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

React.render(
  <Menu url="api/menu/data.json"/>,
  document.getElementById('menu')
);