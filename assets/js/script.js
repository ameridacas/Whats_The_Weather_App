//api:"017bca9d42017769b4b46e88e4a81cce", keyname: Whats_the_WeatherAPI
//api:"c8724acd65684f09fa89b3306a1a04d3", keyname: Default
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={017bca9d42017769b4b46e88e4a81cce}`
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={c8724acd65684f09fa89b3306a1a04d3}`

// Variables
var apiKey = "017bca9d42017769b4b46e88e4a81cce";
var defaultApiKey = "c8724acd65684f09fa89b3306a1a04d3";
var apiName = "Whats_the_WeatherAPI";
var defaultApiName = "Default";
var searchInput = document.getElementById('search-input');
var weatherDataKey = 'weatherData';
var searchHistoryKey = 'searchHistory';

function getWeatherData(city, apiKey) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            // Store the API data with the city name as the key
            localStorage.setItem(city.toLowerCase(), JSON.stringify(data));

            // Retrieve and update the search history
            var searchHistory = JSON.parse(localStorage.getItem(searchHistoryKey)) || [];
            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory));
            }

            alert('Weather data and search history updated in local storage.');
        })
        .catch(function (error) {
            console.error('Error fetching weather data:', error);
        });
}

function searchWeather() {
    var cityName = searchInput.value;

    // Check if the user entered a city name
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    // Choose the API key based on the selected API
    var selectedApiKey = apiName === "Whats_the_WeatherAPI" ? apiKey : defaultApiKey;

    getWeatherData(cityName, selectedApiKey);
}

// function to check and parse the stored data in local storage
function displayStoredWeatherData() {
    var storedData = localStorage.getItem(weatherDataKey);

    if (storedData) {
        var parsedData = JSON.parse(storedData);
        console.log(parsedData);
    } else {
        console.log('No weather data found in local storage.');
    }
}

// Call this function to display stored weather data
displayStoredWeatherData();


