(function(){

	return {
		defaultState: 'loading',

		requests: {},

		events: {
			'app.activated': function(){
				console.log(this.currentState);
				this.switchTo('debug');
				console.log(this.currentState);
				this.switchTo('fetch_fail');
				console.log(this.currentState);
			},

			'requestWeather.done': function(data){
				this.renderWeather(data || {});
			},

			'requestWeather.fail': function(data){
				this.switchTo('fetch_fail');
			}
		},

		requestWeather: function(){
			this.ajax('fetchWeather');
		},

		renderWeather: function(data){
			this.weatherData = data;
			console.log(data);
		}
	};
}());
