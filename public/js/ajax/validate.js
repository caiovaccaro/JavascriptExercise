export default function(input){
	return new Promise(function(resolve, reject){
		var status  = undefined;
		var parsed  = false;
		var data    = input.data;
		var url     = input.url;

		status = status!=="invalid" && (data === null)          && "invalid";
		status = status!=="invalid" && (data === undefined)     && "invalid";
		status = status!=="invalid" && (data instanceof Object) && "valid";
		parsed = status==="valid"   && (data instanceof Object) && data;
		
		if( status!=="invalid" && status!=="valid" ){
			try{
				parsed = JSON.parse(data);
			} catch (e) {
				status = "invalid";
			}
		}

		if(parsed){
			return resolve(parsed);
		}else{
			var error = new Error("invalid JSON: " + url);
			return reject(error);
		}
	})
}