let selectedUnit = 'metric';

function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value.trim();

    if (location === '') {
        alert('Please enter a location (city or ZIP code).');
        return;
    }

    const apiKey = 'ae2baf47071839accbb2cecbfefe499c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${selectedUnit}&appid=${apiKey}`;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const weatherData = JSON.parse(xhr.responseText);
                displayWeather(weatherData);
            } else {
                handleWeatherError(xhr.status);
            }
        }
    };

    xhr.open('GET', apiUrl, true);
    xhr.send();
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    if (data.cod !== '404') {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;

        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature} ${getTemperatureSymbol()} </p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Weather: ${description}</p>
        `;
    } else {
        handleWeatherError(404);
    }
}

function handleWeatherError(statusCode) {
    const weatherInfo = document.getElementById('weatherInfo');

    let errorMessage = '';

    switch (statusCode) {
        case 404:
            errorMessage = 'Location not found. Please check the entered location and try again.';
            break;
        default:
            errorMessage = `Error: ${statusCode}. There was an issue with the weather request. Please try again later.`;
    }

    weatherInfo.innerHTML = `<p class="error-message">${errorMessage}</p>`;
}

function getTemperatureSymbol() {
    return selectedUnit === 'metric' ? '&#8451;' : '&#8457;';
}

function updateUnit() {
    const unitSelect = document.getElementById('unitSelect');
    selectedUnit = unitSelect.value;

    getWeather();
}
