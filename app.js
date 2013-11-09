(function(){

	return {
		defaultState: 'loading',

		requests: {
			fetchWeather: function(){
				return {
					url: this.helpers.fmt("http://api.openweathermap.org/data/2.5/forecast/daily?q=%@&mode=json&units=metric&cnt=3", this.setting('city')),
					type: 'GET',
					data: {}
				};
			}
		},

		events: {
			'app.activated': function(){
				this.requestWeather();
			},

			'fetchWeather.done': function(data){
				this.renderWeather(data || {});
			},

			'fetchWeather.fail': function(data){
				this.switchTo('fetch_fail');
			}
		},

		requestWeather: function(){
			this.ajax('fetchWeather');
		},

		renderWeather: function(data){
			for (var i = data.list.length - 1; i >= 0; --i) {
				data.list[i].weather = data.list[i].weather[0];
				data.list[i].count = i;
			}

			this.weather = data;
			// console.log(data);

			if (data.cod != "200") {
				alert("Please update your city name, the current one (" + this.setting('city') + ") cannot be found");
				return;
			}

			this.switchTo('weather', {
				main: data,
				items: data.list
			});
		}
	};
}());
