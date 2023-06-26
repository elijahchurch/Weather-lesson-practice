import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';

// Business Logic

function getWeather(city) {
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            printElements(response, city);
        } else {
            printError(this, response, city);
        }
    });

    request.open("GET", url, true);
    request.send();
    request.addEventListener("readystatechange", function () {
        console.log(this.readyState);
    });
}

// UI Logic

function printError(request, apiResponse, city) {
    document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) {
    document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
    The temperature in Farenheight is ${apiResponse.main.temp} degrees. A brief description for today's weather in ${city} is ${apiResponse.weather[0].description}. Sunrise today is: ${new Date(apiResponse.sys.sunrise * 1000)}`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const city = document.querySelector('#location').value;
    document.querySelector('#location').value = null;
    getWeather(city);
}

window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});