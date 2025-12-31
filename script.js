const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidityValue = document.getElementById('humidity-value');
const windValue = document.getElementById('wind-value');

const api_key = "e9f92d342d91557681d98807835230fb";

async function checkWeather(city) {
  if (!city.trim()) return;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 404 || data.cod === '404') {
      alert("City not found 😕");
      return;
    }

    // Update UI
    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}<sup>°C</sup>`;
    description.textContent = data.weather[0].description;
    humidityValue.textContent = `${data.main.humidity}%`;
    windValue.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // m/s → km/h

    // Choose image
    const weatherType = data.weather[0].main.toLowerCase();
    const images = {
      clouds:    "assets/cloud.png",
      clear:     "assets/clear.png",
      rain:      "assets/rain.png",
      drizzle:   "assets/rain.png",
      thunderstorm: "assets/rain.png",
      snow:      "assets/snow.png",
      mist:      "assets/mist.png",
      smoke:     "assets/mist.png",
      haze:      "assets/mist.png",
      dust:      "assets/mist.png",
      fog:       "assets/mist.png",
      sand:      "assets/mist.png",
      ash:       "assets/mist.png",
      squall:    "assets/rain.png",
      tornado:   "assets/rain.png"
    };

    weatherImg.src = images[weatherType] || "assets/unknown.png";

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong... Check your connection");
  }
}

// Search on button click
searchBtn.addEventListener('click', () => {
  checkWeather(inputBox.value);
});

// Bonus: Search with Enter key
inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkWeather(inputBox.value);
  }
});