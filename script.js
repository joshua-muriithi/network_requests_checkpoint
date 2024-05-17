async function getCoordinates(cityName, apiKey) {
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    
    if (data.length > 0) {
        const { lat: latitude, lon: longitude } = data[0];
        return { latitude, longitude };
    } else {
        throw new Error('City not found');
    }
}

async function getWeatherData(latitude, longitude, apiKey) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    
    if (response.ok) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        return { weatherDescription, temperature };
    } else {
        throw new Error('Weather data not found');
    }
}

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherDataDiv = document.getElementById('weatherData');
    const apiKey = '6a839f952859805f4b2e5f1dc935ef8f';
    
    try {
        const { latitude, longitude } = await getCoordinates(cityInput, apiKey);
        const { weatherDescription, temperature } = await getWeatherData(latitude, longitude, apiKey);
        
        weatherDataDiv.innerHTML = `
            <h2 style="color:white;">Weather in ${cityInput}:</h2>
            <p style="color:white;">Description: ${weatherDescription}</p>
            <p style="color:white;">Temperature: ${temperature} °C</p>
        `;
    } catch (error) {
        weatherDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
