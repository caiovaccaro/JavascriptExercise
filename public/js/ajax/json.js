import AJAX from './ajax';
import validateJSON from './validate';
import customError from './error';

var AjaxError = customError(404)
var JsonError = customError(500)

export default url => AJAX(url).then(validateJSON, AjaxError).catch(JsonError);
