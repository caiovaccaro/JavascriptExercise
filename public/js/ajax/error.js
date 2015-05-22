var log    = (Code, Error) => 
	console.warn('ajax:', Error.message)

var format = (Code, Error) => 
	({index: {error: true, code: String(Code), info: Error.url}})

export default Code => Error => (log(Code, Error), format(Code, Error))
