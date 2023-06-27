import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';

// Business Logic
function getWeather(city) {
    let promise = new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
        request.addEventListener("loadend", function () {
            const response = JSON.parse(this.responseText);
            if (this.status === 200) {
                resolve([response, city]);
            } else {
                reject([this, response, city]);
            }
        });
        request.open("GET", url, true);
        request.send();
    });

    promise.then(function (response) {
        printElements(response);
    }, function (errorMessage) {
        printError(errorMessage);
    });
}
// UI Logic

function printError(error) {
    document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}:  ${error[0].status} ${error[0].statusText}: ${error[1].message}.`;
}

function printElements(data) {
    document.querySelector('#showResponse').innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%.
    The temperature is ${data[0].main.temp} degrees. A brief description for today's weather in ${data[1]} is ${data[0].weather[0].description}. Sunrise today is: ${new Date(data[0].sys.sunrise * 1000)}.`;
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