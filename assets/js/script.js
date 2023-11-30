//api:"017bca9d42017769b4b46e88e4a81cce", keyname: Whats_the_WeatherAPI
//api:"c8724acd65684f09fa89b3306a1a04d3", keyname: Default
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={017bca9d42017769b4b46e88e4a81cce}`
//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={c8724acd65684f09fa89b3306a1a04d3}`

// Variables
var APIKey = "017bca9d42017769b4b46e88e4a81cce";
var DefaultAPIKey = "c8724acd65684f09fa89b3306a1a04d3";
var APIName = "Whats_the_WeatherAPI";
var DefaultAPIName = "Default";
var searchInput = document.getElementById('search-input');
var weatherDataKey = 'weatherData';

function searchWeather() {
    var cityName = searchInput.value;

    // Check if the user entered a city name
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    // Choose the API key based on the selected API
    var selectedAPIKey = APIName === "Whats_the_WeatherAPI" ? APIKey : DefaultAPIKey;
    // API URL
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${selectedAPIKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store the weather data in local storage
            localStorage.setItem(weatherDataKey, JSON.stringify(data));

            // Placeholder: You can update the UI or navigate to another page here
            alert('Weather data fetched and stored in local storage.');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
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