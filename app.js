var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var time = document.querySelector('.time');
var shortDesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var content = document.querySelector('.content');
var body = document.querySelector('body');
// <!-------------------------------------------!>

async function changeWeatherUI(capitalValue) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=b1d871daba89b8b24c5f9c907650a05f`;

    let data = await fetch(apiURL).then((response) => response.json());
    console.log(data);
    // <!-------------------------------------------!>
    if (data.cod == 200) {
        content.classList.remove('hide');
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        let temp = Math.floor(data.main.temp - 273.15);
        value.innerHTML = temp + '<sup>o</sup>C';

        let date = new Date(data.dt * 1000);
        time.innerText = date.toString();
        // time.innerText = new Date().toLocaleString('vi');
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : '?';
        body.setAttribute('class', 'hot');
        if (temp <= 25) {
            body.setAttribute('class', 'cool');
        }
        if (temp <= 22) {
            body.setAttribute('class', 'warm');
        }
        if (temp <= 19) {
            body.setAttribute('class', 'cold');
        }
    } else {
        content.classList.add('hide');
    }
}

search.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        let capitalValue = search.value.trim();
        changeWeatherUI(capitalValue);
    }
});
changeWeatherUI('Hanoi');
