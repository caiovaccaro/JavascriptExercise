export default function(url, type){
	return new Promise(function(resolve, reject){
		var request = new XMLHttpRequest();
		request.responseType = (type ||  "json");
		request.open('GET', url, true);

		request.onload = function(){
			var serverOK = (this.status == 200 || this.status < 400);
			if (serverOK){
				return resolve({data: this.response, url: url});
			}else{
				var error = new Error("HTTP: " + request.status + ". url: " + url);
				return reject(error)

			}
		};

		request.onerror = function(){
			var error = new Error("HTTP: " + request.status + ". url: " + url);
			return reject(error)
		};

		request.send();
	})
};
