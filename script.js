document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let input = document.querySelector('#searchInput').value.trim();

    if (input) {
        showAlert('Loading...');

        const apiKey = '9c9178b7f2c52bf906e6649814393adb';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input)}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                showWeather({
                    name: data.name,
                    country: data.sys.country,
                    temp: data.main.temp,
                    tempIcon: data.weather[0].icon,
                    windSpeed: data.wind.speed,
                    windAngle: data.wind.deg,
                });
            } else {
                clearWeather();
                showAlert('Location not found.');
            }
        } catch (error) {
            clearWeather();
            showAlert('An error occurred. Please try again.');
        }
    } else {
        clearWeather();
    }
});

function showWeather(data) {
    showAlert('');
    document.querySelector('.city-title').textContent = `${data.name}, ${data.country}`;
    document.querySelector('.temperature-value').innerHTML = `${data.temp} <sup>ºC</sup>`;
    document.querySelector('.wind-speed').innerHTML = `${data.windSpeed} <span>km/h</span>`;
    document.querySelector('.weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.tempIcon}@2x.png`);
    document.querySelector('.wind-pointer').style.transform = `rotate(${data.windAngle - 90}deg)`;
    document.querySelector('.weather-result').style.display = 'block';
}

function clearWeather() {
    showAlert('');
    document.querySelector('.weather-result').style.display = 'none';
}

function showAlert(message) {
    document.querySelector('.alert-message').textContent = message;
}
