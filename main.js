import Q from 'q'
import {ViewsLoader, Mediator} from 'components/mediatorChannels'
import renderMenu from 'components/modules/modules'
import 'components/views/views'

var firstMenuLinkEl, firstMenuLinkData

Q(renderMenu()).then(function() {
	firstMenuLinkEl = document.querySelectorAll('#menu li.enabled a')[0]

	firstMenuLinkData = {
		route: firstMenuLinkEl.dataset.route,
		path: firstMenuLinkEl.dataset.path,
		status: firstMenuLinkEl.parentNode.className
	}

	Q(ViewsLoader.receiver(firstMenuLinkData)).then(function() {
		document.body.className = 'ready'
	})
})