import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
import WeatherService from './weather-service.js';


// UI Logic
function handleFormSubmission(event) {
    event.preventDefault();
    const city = document.querySelector('#location').value;
    document.querySelector('#location').value = null;
    let promise = WeatherService.getWeather(city);
    promise.then(function (weatherDataArray) {
        printElements(weatherDataArray);
    }, function (errorArray) {
        printError(errorArray);
    });
}

function printError(error) {
    document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}:  ${error[0].status} ${error[0].statusText}: ${error[1].message}.`;
}

function printElements(data) {
    document.querySelector('#showResponse').innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%.
    The temperature is ${data[0].main.temp} degrees. A brief description for today's weather in ${data[1]} is ${data[0].weather[0].description}. Sunrise today is: ${new Date(data[0].sys.sunrise * 1000)}.`;
}


window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});