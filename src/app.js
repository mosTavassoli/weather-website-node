const path = require("path"); // Path is a function-- can be found in nodejs.org with this function we can join two address together like bellow -- there is no need to install any npm module
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

const port = process.env.PORT || 3000; // Get the port from Heroku or set it default 3000 locally

// define path for Express Config
const pathPublicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handelbars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup staic directory to serve
app.use(express.static(pathPublicDirectory));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Mostafa Tavassoli",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Mostafa Tavassoli",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some useful test",
		title: "Help",
		name: "Mostafa Tavassoli",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must set the Address. Please try again",
		});
	}
	geocode(req.query.address, (error, { lat, lon, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		forecast(lat, lon, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Mostafa Tavassoli",
		errorMessage: "Page not found.",
	});
});

app.listen(port, () => {
	console.log(`server runs on port ${port}.`);
});
