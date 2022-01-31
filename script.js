//väljer button från html och lägger in den i en variabel
const btn = document.querySelector("button");

//skapar en eventlistener med funktion click till min button
btn.addEventListener("click", function (event) {
    //resettar error message vid varje ny sökning
    let errorMessage = document.getElementById("error-message");
    errorMessage.innerText = ` `;
    //väljer input från html och lagrar i en variael
    const input = document.querySelector("input");
    const KEY = '62dba1b4b04741518d076ec00fb6fc70';
    //sparar värdet i inputen
    let searchText = input.value;

    //bygger ihop url med nyckeln och input
    //har två url en för dagens väder och en för de 5 andra dagarna
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lang=SV&city=${searchText}&key=${KEY}`;
    const urlToday = `https://api.weatherbit.io/v2.0/current?lang=SV&city=${searchText}&key=${KEY}`;

    //fetch för currenturl
    fetch(urlToday).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            //hämtar element från html med id och lagrar info från api i innertext o lagrar i 4 variablar
            let Wdescription = document.getElementById("current-description");
            Wdescription.innerText = data.data[0].weather.description;

            let temperature = document.getElementById("current-temp");
            temperature.innerText = Math.floor(data.data[0].temp) + " C"; 

            let windSpeed = document.getElementById("current-wind");
            windSpeed.innerText = Math.floor(data.data[0].wind_spd) + " m/s";

            let humidity = document.getElementById("current-humidity");
            humidity.innerText = Math.floor(data.data[0].rh) + "%";

            //hämtar element från html med id och lagrar med icon url
            let currentIconImg = document.getElementById("current-weather-icon");
            currentIconImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
        }
    ).catch(
        function (error) {
            //skapar ett felmeddelande om användaren skriver in fel
            let errorMessage = document.getElementById("error-message");
            errorMessage.innerText = `${input.value} is not a valid search!`;
        }
    );


    //fetch för forecastUrl
    fetch(urlForecast).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            //skapar en for loop som körs 5 gånger för varje dag
            for(let i=1; i<=5; i++){
                //hämtar elementet forecast-weather för att få tillgång till child-elementen
                let forecastWeather = document.getElementById("forecast-weather");
                //hämtar div med namn dag1 osv för att nå child-elementen
                weatherDay = forecastWeather.querySelector("#dag"+i);
                //hämtar img inuti varje dag
                let iconImg = weatherDay.querySelector("img");
                //lagrar img.src med icon url
                iconImg.src = `https://www.weatherbit.io/static/img/icons/${data.data[i].weather.icon}.png`;
                //hämtar p-tagen med id = temperature
                let tempForecast = weatherDay.querySelector("#temperature");
                //lagrar temp från api och avrundar
                tempForecast.innerText = Math.floor(data.data[i].temp) + " C";
                //hämtar p-tagen med id = description
                let descripForecast = weatherDay.querySelector("#description");
                //lagrar description från api och avrundar
                descripForecast.innerText = data.data[i].weather.description;
            }
        }
    ).catch(
        function (error) {
            //skapar ett felmeddelande om användaren skriver in fel
            let errorMessage = document.getElementById("error-message");
            errorMessage.innerText = `${input.value} is not a valid search!`;
        }
    );
})


