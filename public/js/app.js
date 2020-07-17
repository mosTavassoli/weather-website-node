const formWeather = document.querySelector("form");
const searchLocation = document.querySelector("input");
const msg_1 = document.querySelector("#msg_1");
const msg_2 = document.querySelector("#msg_2");

formWeather.addEventListener("submit", (e) => {
	e.preventDefault();
	msg_1.textContent = "Loading...";
	msg_2.textContent = "";

	fetch(`/weather?address=${searchLocation.value}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				msg_1.textContent = data.error;
			} else {
				msg_2.textContent = data.forecast;
			}
		});
	});
});
