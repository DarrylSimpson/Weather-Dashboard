
//put search from input into history and local storage to call back on click
//when searching call return city name date, icon, temp, humidity, wind speen and the uv index
// also with 5-day forecast, append some children
//when clicked on search history calls back what was once displayed

 var todayWeatherEl = document.getElementById("today-weather");
 var buttonEl = document.getElementById("search-btn");
 

function getWeatherSearch() {
    var weatherSearch = document.getElementById("search-input").value;
    getInfo(weatherSearch);
    
    makeHistory(weatherSearch);
}

function makeHistory(weatherSearch) {
    var liEl = document.createElement("li");
    liEl.classList.add("list-group-item", "list-group-item-action");
    var historyText = weatherSearch;
    liEl.textContent = historyText;
    var historyEl = document.querySelector(".history");
    //console.log(event.target);
    historyEl.onclick = function() {
        console.log(event.target.tagName)
        console.log(event.target.textContent);
        if (event.target.tagName == "LI"){
            getInfo(event.target.textContent);

        }
    }
        
    historyEl.appendChild(liEl);

};

function getInfo(weatherSearch) {
    

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + weatherSearch +
        "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //variable for where the information is going to display
             var todayEl = document.getElementById("today-weather");
             //empty out the div
            todayEl.innerHTML = '';
            

            //make the information appear in the html
            //creating elements and classes to hold the data fetched from weather
            var cardEl = document.createElement("div");
            $(cardEl).addClass("card");
            var bodyEl = document.createElement("div")
            $(bodyEl).addClass("body");
            var titleEl = document.createElement("h1");
            $(titleEl).addClass("title");
            var tempEl = document.createElement("p");
            $(tempEl).addClass("text");
            var humidityEl = document.createElement("p");
            $(humidityEl).addClass("text");
            var windEl = document.createElement("p");
            $(windEl).addClass("text"); 
            //var uvEl = document.createElement("p");
            //$(uvEl).addClass("text");
            var iconEl = document.createElement("img");
             
            //setting the information that goes within each element
            titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
            tempEl.textContent = "Temperture: " + data.main.temp + " °F";
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            //uvEl.textContent = "UV index: ";
            iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            
            //appending all the information above into the html
            titleEl.appendChild(iconEl);
            todayEl.appendChild(cardEl);
            cardEl.appendChild(bodyEl);
            bodyEl.appendChild(titleEl);
            bodyEl.appendChild(tempEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(windEl);
            //bodyEl.appendChild(uvEl);

            fiveDay(weatherSearch);
            findUVIndex(data.coord.lat, data.coord.lon);
              //console.log(data);
        })
        

}

function fiveDay(weatherSearch) {
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherSearch + 
    "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //console.log(data);
        var futureEl = document.getElementById("future-weather");
        var forecastText = document.createElement("h5");
        $(forecastText).addClass("mt-3");
        forecastText.innerHTML = "5-Day Forecast:";
        futureEl.innerHTML = '';

        futureEl.appendChild(forecastText);

         //var futureTitleEl = document.createElement("div");
        // $(futureTitleEl).addClass("row");
        for (var i = 0; i < data.list.slice(1, 6).length; i++) {
        
        //make card for one of the days for the 5 day forecast
        var forecastContainerEl = document.createElement("div");
        $(forecastContainerEl).addClass("col-md-2");
        var forecastCardEl = document.createElement("div");
        forecastCardEl.classList.add("card", "card-bg", "text-white");
        var forecastBodyEl = document.createElement("div");
        $(forecastBodyEl).addClass("body");

        var forecastTitleEl = document.createElement("h4");
        $(forecastTitleEl).addClass("title");

        var forecastTempEl = document.createElement("p");
        $(forecastTempEl).addClass("text");
        //var forecastWindEl = document.createElement("p");
        //$(forecastWindEl).addClass("text");
        var forecastHumidEl = document.createElement("p");
        $(forecastHumidEl).addClass("text");

        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
        

        forecastTitleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
        forecastTempEl.textContent = "Temp: " + data.list[i].main.temp + " °F";
        forecastHumidEl.textContent = "Humidity: " + data.list[i].main.humidity;
        //forecastWindEl.textContent = "Wind Speed: " + data.list[i].wind.speed;

        
        futureEl.appendChild(forecastContainerEl);
        forecastContainerEl.appendChild(forecastCardEl);
        forecastBodyEl.appendChild(forecastTitleEl);
        forecastBodyEl.appendChild(iconEl);
        forecastCardEl.appendChild(forecastBodyEl);
        forecastBodyEl.appendChild(forecastTempEl);
        //forecastBodyEl.appendChild(forecastWindEl);
        forecastBodyEl.appendChild(forecastHumidEl);

        }
        

    });

}

function findUVIndex(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + 
    "&appid=a10604c45c58c3bf1280eb707dbe4a72")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //console.log(data);
        var bodyUVEl = document.querySelector(".body");
        var uvEl = document.createElement("p");
        uvEl.textContent = "UV Index: ";

        var uvColorEl = document.createElement("span");
        $(uvColorEl).addClass("btn", "btn-sm");
        uvColorEl.innerHTML = data.value;

        if (data.value < 3) {
            $(uvColorEl).addClass("btn-success");
          }
          else if (data.value < 7) {
            $(uvColorEl).addClass("btn-warning");
          }
          else {
            $(uvColorEl).addClass("btn-danger");
          }


        bodyUVEl.appendChild(uvEl);
        uvEl.appendChild(uvColorEl);
    })
}



document.querySelector("#search-button").addEventListener("click", getWeatherSearch);


