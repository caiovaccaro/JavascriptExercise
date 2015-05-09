import AJAX from './ajax';
import validateJSON from './validate';

export default url => AJAX(url).then(validateJSON);

