(function(){

	return {
		defaultState: 'loading',

		requests: {
			fetchWeather: function(){
				var unit = (this.setting('unit').toLowerCase() === 'f') ?
						'imperial' : 'metric';
				return {
					url: this.helpers.fmt("http://api.openweathermap.org/data/2.5/forecast/daily?q=%@&mode=json&units=%@&cnt=%@", this.setting('city'), unit, this.setting('range')),
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

			data.unit = (this.setting('unit').toLowerCase() === 'f') ? 'F' : 'C';
			this.switchTo('weather', {
				main: data,
				items: data.list
			});
		}
	};
}());
