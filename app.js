(function(){

	return {
		defaultState: 'debug',

		requests: {},

		events: {
			'app.activated': 'debug'
		},

		debug: function(){
			alert("started");
			console.log("launched");
		}
	};

}());
