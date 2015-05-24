import getJSON from 'ajax/json'
import * as Lib from './model_lib';

export default function(){
	this.process  = data => Lib.process(data)
	this.order    = data => Lib.enumerate(data)
	this.get      = prop => data => data[prop]
	this.fromJSON = url  => this.create(getJSON(url))
	this.wrap     = prop => Lib.wrap(prop)

	return this
}
