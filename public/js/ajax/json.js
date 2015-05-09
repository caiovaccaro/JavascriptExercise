import AJAX from './ajax';
import validateJSON from './validate';

export default url
	return AJAX(url).then(validateJSON);
}
