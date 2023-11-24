const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "bc5576a576a26090dfe59469845cf00c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/h`;
    console.log(weather_data)

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "/pics/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/pics/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/pics/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "/pics/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "/pics/snow.png";
            break;
        default:
            weatherImg.src = "/pics/cloud.png";
    }
}

searchBtn.addEventListener('click', () => { checkWeather(inputBox.value); });