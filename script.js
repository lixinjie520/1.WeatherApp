const input = document.querySelector('.city');
const button = document.querySelector('.submit');
const weatherIcon = document.querySelector('.weather-icon')
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const error = document.querySelector('.error')
const container1 = document.querySelector('.container1')
const apiKey = "bf67762e3da7cc23b0d4605cdc37120e"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const weatherImages = {
    "Clouds": "images/clouds.png",
    "Clear": "images/clear.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/drizzle.png",
    "Mist": "images/mist.png"
};

async function checkWeather(city) {    
    const reponse = await fetch(apiUrl + city + `&appid=${apiKey}`)
    if(reponse.status===404){
        error.style.display = 'block'
        container1.style.display = 'none'
    }else{
        let data = await reponse.json();
        temp.innerHTML = Math.round(data.main.temp)+"°C";
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity+"%";
        wind.innerHTML = data.wind.speed+' km/h';
        const weather = data.weather[0]
    
        // if (weather.main == "Clouds") {
        //     weatherIcon.src = "images/clouds.png"
        // } else if (weather.main == "Clear") {
        //     weatherIcon.src = "images/clear.png"
        // } else if (weather.main == "Rain") {
        //     weatherIcon.src = "images/rain.png"
        // } else if (weather.main == "Drizzle") {
        //     weatherIcon.src = "images/drizzle.png"
        // } else if (weather.main == "Mist") {
        //     weatherIcon.src = "images/mist.png"
        // }
        weatherIcon.src = weatherImages[weather.main] || "images/clear.png";
        error.style.display = 'none';
        container1.style.display = 'block'
        input.value = ""
    }
    
}
function cleanInputString(str){
    const regex = /[+-\s]/g;
    return str.replace(regex,'')
}

button.addEventListener('click',()=>{    
    checkWeather(cleanInputString(input.value))
})
input.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        checkWeather(cleanInputString(input.value))
    }
})
