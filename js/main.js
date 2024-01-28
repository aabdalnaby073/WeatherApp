var leftTempInfo1 = document.getElementsByClassName('currentInfo');
var leftTempInfo2 = document.getElementsByClassName('dayInfo');
var leftTempInfo3 = document.getElementsByClassName('location'); 
var mybuttons = Array.from(document.getElementsByTagName('button')); 

var maxTemp = document.getElementById('maxTemp');
var minTemp = document.getElementById('minTemp');

var wind = document.getElementById('wind');

var avgvis = document.getElementById('avgvis');

var humidity = document.getElementById('avghumidity');

var daily_chance_of_rain = document.getElementById('daily_chance_of_rain');

var daily_chance_of_snow = document.getElementById('daily_chance_of_snow');

var city = document.getElementById('cityName').value;

var input = document.getElementById('cityName') ; 

var searchIcon= document.getElementById('searchIcon');  

var myLocation ; 
var allDayTemp; 
var currentTemp; 

async function getData(cityName = city, dayNo = 0)
{

    data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=47d970e257794e83ac783612231508&q=${cityName}&days=3&aqi=no&alerts=no`);
    data = await data.json();
    myLocation = data.location;
    allDayTemp = data.forecast.forecastday[dayNo];
    currentTemp = data.current; 
} 



function display ()
{

        var cartona1 = `
    <img src="${allDayTemp.day.condition.icon}"  alt="" srcset="">
    
    <h1 class="mt-5 currentTemp">${Math.round(allDayTemp.day.avgtemp_c)}<sup>o</sup><span class="c">C</span> </h1>
    
    <p class="mb-5 mt-2 weatherStatus">${allDayTemp.day.condition.text}</p>
    <hr>
</div>

    `
        leftTempInfo1[0].innerHTML = cartona1;
        var dayName = new Date(allDayTemp.date);

        var cartona2 = `


<div class="dayInfo text-center mb-5">
<p class="m-0 date">${allDayTemp.date}</p>
<p class="dayTime">${dayName.toString().substr(0, 3)}, ${myLocation.localtime.substr(10,)}</p>
</div>
`
        leftTempInfo2[0].innerHTML = cartona2;
        leftTempInfo3[0].innerHTML = `<p class="location">${myLocation.name}, ${myLocation.country}</p>`
    maxTemp.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Max Temp<p/>
    <h1 class="info">${allDayTemp.day.maxtemp_c}<sup>o</sup><span class="c">C</span></h1></div>`

    minTemp.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Min Temp<p/>
    <h1 class="info">${allDayTemp.day.mintemp_c}<sup>o</sup><span class="c">C</span></h1>
</div>`

    wind.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Wind speed<p/>
    <h1 class="info">${allDayTemp.day.maxwind_mph} km/h</h1>
</div>`

    avgvis.innerHTML = `<div class="cardcontent">
        <p class="infoTitle">avgvis<p/>
            <h1 class="info">${allDayTemp.day.avgvis_km} km/h</h1>
    </div>`

    humidity.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Humidity<p/>
    <h1 class="info">${allDayTemp.day.avghumidity} %</h1>
</div>`

    daily_chance_of_rain.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Chance of rain<p/>
    <h1 class="info">${allDayTemp.day.daily_chance_of_rain} %</h1>
</div>`


    daily_chance_of_snow.innerHTML = `<div class="cardcontent">
    <p class="infoTitle">Chance of snow<p/>
    <h1 class="info">${allDayTemp.day.daily_chance_of_snow} %</h1>
</div>`


}


async function main()
{
    await getData(); 
    display();

}


for (let i = 0; i < mybuttons.length; i++) {
    mybuttons[i].addEventListener('click', async function () {
        mybuttons.forEach(button => button.classList.remove('selectedDay'));
        mybuttons[i].classList.add('selectedDay')
        await getData(city, i);
        display();
    });
}

input.addEventListener('input', function () {
    city = input.value;
});



document.addEventListener('keydown' , async function(e)
{
    if (e.key == 'Enter')
    {
        await getData(city, 0);
        display();
    }
}
);

searchIcon.addEventListener('click' , async function(){
    await getData(city, 0);
    display();
});

main(); 

