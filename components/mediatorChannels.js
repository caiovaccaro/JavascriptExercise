import Mediator from './lib/mediator'
import ViewsLoader from './viewsLoader'

Mediator.subscribe('menuClick', function(args) {
	ViewsLoader.receiver(args);
});