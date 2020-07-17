const request = require("postman-request");

const forecast = (lon, lat, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=4b039ca69e7ac251fe415e1d175bb395&query=${lat},${lon}&units=m`;

	request({ url: url, json: true }, (err, res) => {
		if (err) {
			callback("Unable to conect to the Server");
		} else if (res.body.error) {
			callback("Unable to find the Location");
		} else {
			callback(
				undefined,
				`The current weather is  ${res.body.current.weather_descriptions[0]} and It is currently ${res.body.current.feelslike} degress feelslike out.
				The location is ${res.body.location.country}`
			);
			// current_weather: res.body.current.weather_descriptions[0],
			// feelslike: res.body.current.feelslike,
			// country: res.body.location.country,
			// region: res.body.location.region,
		}
	});
};

module.exports = forecast;
