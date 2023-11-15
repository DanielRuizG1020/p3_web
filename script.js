    
  document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const errorContenedor = document.querySelector('.error');
    const weatherContenedor = document.querySelector('.weather');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.humidity');
    const wind_ = document.querySelector('.wind');

    searchButton.addEventListener('click', async function () {
        const ciudad = searchInput.value;

        if (ciudad.trim() === '') {
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${ciudad}&appid=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
            DatosClima(weatherData);
        } catch (error) {
            showError('Nombre de ciudad no válido.');
        }
    });

    function DatosClima(weatherData) {

      errorContenedor.style.display = 'none';
      weatherContenedor.style.display = 'block';
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      weatherIcon.src = iconUrl;
      temperature.textContent = `${weatherData.main.temp} °C`;
      city.textContent = weatherData.name;
      humidity.textContent = `${weatherData.main.humidity}%`;
      wind_.textContent = `${weatherData.wind.speed} km/h`;
    }

    function showError(message) {
     weatherContenedor.style.display = 'none';
      errorContenedor.style.display = 'block';
      errorContenedor.innerHTML = `<p>${message}</p>`;
    }
});