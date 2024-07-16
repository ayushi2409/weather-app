const apiKey = '360fb193aa85923b330786ff274a0db8'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    getWeather(location);
});

async function getWeather(location) {
    const weatherInfo = document.getElementById('weatherInfo');
    const loadingSpinner = document.getElementById('loadingSpinner');

    weatherInfo.innerHTML = '';
    weatherInfo.classList.remove('visible');
    loadingSpinner.style.display = 'flex';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const backgroundImages = {
        Clear: 'c.png',
        Clouds: 'c.png',
        Rain: 'rain.png',
        Snow: 'c.png',
        Mist: 'rain.png',
    };
    const weatherMain = data.weather[0].main;
   
    const localTime = new Date((data.dt + data.timezone) * 1000).toLocaleString();

    weatherInfo.innerHTML = `
        <p><strong>Location:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <img src="${weatherIcon}" alt="Weather Icon" class="icon">
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
         <p><strong>Current Time:</strong> ${localTime}</p>
    `;
    weatherInfo.classList.add('visible');
}