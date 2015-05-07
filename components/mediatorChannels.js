import Mediator from './lib/mediator';
import ViewsLoader from './viewsLoader.jsx!';

Mediator.subscribe('menuClick', function(args) {
  return ViewsLoader.receiver(args);
});

export {ViewsLoader, Mediator}