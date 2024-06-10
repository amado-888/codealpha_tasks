function getWeather(){
    const apikey = "da680b1f8aacfe3b2915b88579a4c73a"
    const city = document.getElementById('city').value
    if(!city){
        alert('Please enter a city')
        return;
    }
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apikey}`;    
     fetch(currentWeatherURL)
     .then(result=>result.json())
     .then(data=>{
        displayWeather(data);
     }).catch(error=>{
        console.error("Error fetching wethear data:", error)
        alert('Error fetching weather data , Please try again');
     })
  
     fetch(forecastURL)
     .then(result=>result.json())
     .then(data=>{
        displayHourlyForecast(data.list);
     }).catch(error=>{
        console.error("Error fetching hourly forecast data:", error)
        alert('Error fetching hourly forecast data , Please try again');
     })
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div') 
    const weatherInfoDiv = document.getElementById('weather-info') 
    const weatherIconDiv = document.getElementById('weather-icon') 
    const hourlyForecastDiv = document.getElementById('hourly-forecast') 
    weatherInfoDiv.innerHTML=''
    hourlyForecastDiv.innerHTML=''
    tempDivInfo.innerHTML=''
    if(data.cod === '404'){
          weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    }else{
        const cityName = data.name
        const temprature = Math.round(data.main.temp-273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const tempratureHTML = `<p>${temprature}</p>`
        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
        `
        tempDivInfo.innerHTML = tempratureHTML
        weatherInfoDiv.innerHTML = weatherHTML
        weatherIconDiv.src = iconUrl
        weatherIconDiv.alt = description

        showImage();
    }

}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
    const nexr24Hours = hourlyData.slice(0,8)
    nexr24Hours.forEach(item=>{
        const dateTime = new Date(item.dt*1000);
        const hour = dateTime.getHours()
        const temprature = Math.round(item.main.temp-273.15)
        const iconCode = item.weather[0].icon
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`
        const hourlyItemHTML = `
        <div class = "hourly-item">
            <span>${hour}:00</span>
            <img src = "${iconURL}" alt = "Hourly weather icon">
            <span>${temprature}C</span>
        </div>
        `
        hourlyForecastDiv.innerHTML+=hourlyItemHTML
    })
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon')
    weatherIcon.style.display = 'block'
}