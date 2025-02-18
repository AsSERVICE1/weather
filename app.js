let weatherCountry = document.querySelector('.weather-country');
let weatherDate = document.querySelector('.weather-date');
const iconImg = document.querySelectorAll('.icon-img');
let weatherType = document.querySelector('.weather-type');
let temp = document.querySelector('.temp'); 
let prePercent = document.querySelector('.pre-percent');
let humidPercent = document.querySelector('.humid-percent');
let windKm = document.querySelector('.wind-km');
let weatherMin = document.querySelector('.weather-min');
let weatherMax = document.querySelector('.weather-max');
let citySearch = document.querySelector('.weather-search')




// to get the actual name of the country

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}


const getDateTime = (dt) => {
    //to get the date


const curDate = new Date(dt*1000);

// console.log(curDate)

const options = {
    year: "numeric",
    month:"long",
    day:"numeric"
}


const formatter = new Intl.DateTimeFormat('en-US', options)
const formatedDate = formatter.format(curDate)
// console.log(formatedDate)

return formatedDate;
}

let city = "karachi";

// search functioonality

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector('.city-name');
    city = cityName.value;

    getWeatherData();
    cityName.value = ""
})

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2cd8c0e07b87a295ac507ad901015003`
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data);

        const {dt, main, sys, weather, wind, name} = data;

        temp.innerHTML = main.temp;

        prePercent.innerHTML = main.feels_like;

        humidPercent.innerHTML = `${main.humidity}%` ; 

        windKm.innerHTML = `${wind.speed} km/h`; 

        weatherMin.innerHTML = `min: ${main.temp_min.toFixed()}&#176;` ;

        weatherMax.innerHTML = `max: ${main.temp_max.toFixed()}&#176;` ;

        weatherType.innerHTML = weather[0].main;

        weatherCountry.innerHTML = `${name}, ${getCountryName(sys.country)}`;

        weatherDate.innerHTML = getDateTime(dt);

        iconImg.forEach(icon => {
            icon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
        });
    } catch (error) {
        console.log(error)
    }
}


document.body.addEventListener('load', getWeatherData());