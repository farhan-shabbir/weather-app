const apiKey = "ae35ad7b1057d01afd0c89a44bbba1f4";


let cityName = document.getElementById("city");
let feels = document.getElementById("feels-like");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let temp = document.getElementById("temp");
const loader = document.getElementById("loader");

let search = document.getElementById("search_btn");
const cityInput = document.getElementById("city-input");

// loader
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// Function to display weather
function displayWeather(data) {
  temp.innerText = `${Math.round(data.main.temp)}°C`;
  cityName.innerText = data.name;
  feels.innerText = `${Math.round(data.main.feels_like)}°C`;
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed} m/s`;
  pressure.innerText = `${data.main.pressure} hPa`;
}

// Search by city
async function getWeather(city) {

  showLoader();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();
    
    if (data.cod != 200) {
      alert(data.message);
      return;
    }
   console.log(data);
    displayWeather(data);
  } catch (error) {
    console.log(error);
  }finally {
    hideLoader();
  }
}

// Current location weather
function getCurrentLocationWeather() {
  showLoader();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        displayWeather(data);
      } catch (error) {
        console.log(error);
      }finally {
        hideLoader();
      }
    },
    (error) => {
         hideLoader();
      alert("Location permission denied.");
      console.log(error);
    }
  );
}

// Search button
search.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    getWeather(city);
  }
});

// Load current location weather on page load
getCurrentLocationWeather();