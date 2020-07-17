const request = require("postman-request");

const geocode = (address, callback) => {
	const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9zdGFmYXRhdmFzc29saSIsImEiOiJja2NpOWs0ZTMxMXdhMndscDVldmlzamU0In0.NjvsX_SgOdhR02gq4IeNMg&limit=1`;

	request({ url: urlMap, json: true }, (err, res) => {
		if (err) {
			callback("Unable to connect to the Server");
		} else if (res.body.features.length === 0) {
			callback("Unable to find the location");
		} else {
			callback(undefined, {
				lat: res.body.features[0].center[0],
				lon: res.body.features[0].center[1],
				place_name: res.body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
