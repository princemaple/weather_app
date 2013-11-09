(function(){

	return {
		defaultState: 'loading',

		requests: {
			fetchWeather: {
				url: helpers.fmt('http://api.openweathermap.org/data/2.5/forecast/daily?q=%@&mode=json&units=metric&cnt=3', this.setting('city').toLowerCase())
			}
		},

		events: {
			'app.activated': 'fetchWeather',

			'fetchWeather.done': function(data){
				this.renderWeather(data || {});
			},

			'fetchWeather.fail': function(data){
				this.switchTo('fetch_fail');
			}
		},

		renderWeather: function(data){
			this.weatherData = data;
			console.log(data);
		}
	};

})();