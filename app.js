(function(){

	return {
		defaultState: 'loading',

		requests: {
			fetchWeather: {
				url: helpers.fmt('http://api.openweathermap.org/data/2.5/forecast/daily?q=%@&mode=json&units=metric&cnt=3', this.setting('city').toLowerCase())
			}
		},

		events: {
			'app.activated': 'requestWeather',

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