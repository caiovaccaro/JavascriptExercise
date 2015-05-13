import getJSON from 'ajax/json'
import {process, wrap} from './model_lib'

export default function(){
	this.process  = data => process(data)
	this.get      = prop => data => data[prop]
	this.fromJSON = url  => this.create(getJSON(url))
	this.wrap     = prop => wrap(prop)

	return this
}
