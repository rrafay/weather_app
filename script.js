// Import HTML elements 
var notificationElement = document.querySelector(".notification");
var iconElement = document.querySelector(".icon-image");
var temperatureElement = document.querySelector(".temperature p");
var weatherDescriptionElement = document.querySelector(".weather-description p");
var locationElement = document.querySelector(".location p");
var sunriseElement = document.querySelector(".sunrise p");
var sunsetElement = document.querySelector(".sunset p");
var timediffElement = document.querySelector(".time-difference p");




// Object that stores temp data and later will be responsible for storing temp data from the API
var weather_object = {
    temperature: {
        value: 56,
        unit: "fahrenheit"
    },
    description: "cloudy",
    iconId: "01",
    location: "Boston",
    country: "USA",
    sunrise: "2",
    sunset: "2",
    daytime: "2"

};

// // send the completed object element back to HTML for display 
// iconElement.innerHTML = `<img src="icons/${weather_object.iconId}.png">`;
// temperatureElement.innerHTML = `${weather_object.temperature.value} ° <span>F</span>`;
// weatherDescriptionElement.innerHTML = weather_object.description;
// locationElement.innerHTML = `${weather_object.location}, ${weather_object.country}`;

//function to convert Farenheit to Celcius (rounds off the value)
function FtoC(temp) {

    return ((temp - 32) * (5 / 9)).toPrecision(2)
};

//On a users click on the temperature element convert F to C
temperatureElement.addEventListener("click", function () {

    if (weather_object.temperature.unit === undefined) return;
    if (weather_object.temperature.unit === "fahrenheit") {
        let Celcius = FtoC(weather_object.temperature.value);

        temperatureElement.innerHTML = `${Celcius} °<span>C</span>`;
        weather_object.temperature.unit = "celsius";
    }
    else {
        temperatureElement.innerHTML = `${weather_object.temperature.value} °<span>F</span>`;
        weather_object.temperature.unit = "fahrenheit";

    }


});




// Check Users Location
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
};

// store users location
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
};

// Error Message in case user denies location
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.style.color = "red";
    notificationElement.innerHTML = `<p> ${error.message} </p> `;
};

// API key
const key = "2f299bff0bc2bb868192851933712965";

// fetch data from the data
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api);
    fetch(api)
        .then(function (response) {
            var data = response.json();
            return data;

        })
        //put weather data objects in the weather_object 
        .then(function (data) {
            let Kelvin = kelvinF(data.main.temp);
            let sunriseTime = timeConversion(data.sys.sunrise);
            let sunsetTime = timeConversion(data.sys.sunset);
            let timediff = dayTime(data.sys.sunset, data.sys.sunrise);

            weather_object.temperature.value = Kelvin;
            weather_object.description = data.weather[0].description;
            weather_object.iconId = data.weather[0].icon;
            weather_object.location = data.name;
            weather_object.country = data.sys.country;
            weather_object.sunrise = sunriseTime;
            weather_object.sunset = sunsetTime;
            weather_object.daytime = timediff;
        })
        .then(function () {
            displayWeather();
        });

};

// Convert Kelvin values to Farenheit
function kelvinF(temp){
    return ((temp - 273.15) *(9/5) + 32).toPrecision(2)
};

// send the completed object element back to HTML for display
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather_object.iconId}.png">`;
    temperatureElement.innerHTML = `${weather_object.temperature.value} °<span>F</span>`;
    weatherDescriptionElement.innerHTML = weather_object.description;
    locationElement.innerHTML = `${weather_object.location}, ${weather_object.country}`;
    sunriseElement.innerHTML = `<span><img src="icons/sunup.png" style = "width:8%;">Sunrise: </span>${weather_object.sunrise}`;
    sunsetElement.innerHTML = `<span><img src="icons/sundown.png" style = "width:8%;">Sunset: </span>${weather_object.sunset}`;
    timediffElement.innerHTML = `<span>Daytime: </span>${weather_object.daytime}<span> hrs</span>`;
};


// Convert Unix time to 12-hour time 
function timeConversion(time){
    return (new Date(time * 1000).toLocaleTimeString())
};

// Calculate day time hours in a day
function dayTime(rise, set){
    return (Math.abs(set - rise) / (3600)).toPrecision(3)
    
};




 // unused features in the weather app

// // Hide and display the first button on the right of the weather card
// function clicked(){
//     var bot = document.getElementById("chatVisibility");
//     if(bot.style.display === "none"){
//         bot.style.display = "block";
//     }
//     else{
//         bot.style.display = "none";
//     }
 
// };

// // Hide and display the second button on the left side of the weather card
// function secondClicked(){
//     var bot_2 = document.getElementById("chatVisTwo");
//     if(bot_2.style.display === "none"){
//         bot_2.style.display = "block";
//     }
//     else{
//         bot_2.style.display = "none";
//     }
// };

