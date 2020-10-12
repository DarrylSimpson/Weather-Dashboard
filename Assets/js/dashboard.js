
//creating a function that holds what the user types and runs the other functions when this is called
function getWeatherSearch() {
    var weatherSearch = document.getElementById("search-input").value;
    getInfo(weatherSearch);
    makeHistory(weatherSearch);
}

//function to make a <li> list to store what the user has typed
function makeHistory(weatherSearch) {
    //create <li> with these specific classes
    var liEl = document.createElement("li");
    liEl.classList.add("list-group-item", "list-group-item-action");
    //making the text in the <li> what the user typed
    var historyText = weatherSearch;
    liEl.textContent = historyText;
    var historyEl = document.querySelector(".history");
    //console.log(event.target);
    //on click this runs the getInfo with an argument of what the user typed
    historyEl.onclick = function() {
        //console.log(event.target.tagName)
        //console.log(event.target.textContent);
        if (event.target.tagName == "LI"){
            getInfo(event.target.textContent);
        }
    }  
    //displaying the <li> to the page     
    historyEl.appendChild(liEl);
};

//function to fetch the weather for today
function getInfo(weatherSearch) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + weatherSearch +
        "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //variable for where the information is going to display
             var todayEl = document.getElementById("today-weather");
             //emptying out the div for next search
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
            var iconEl = document.createElement("img");
             
            //setting the information that goes within each element
            titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
            tempEl.textContent = "Temperture: " + data.main.temp + " °F";
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            
            //appending all the information above into the html
            titleEl.appendChild(iconEl);
            todayEl.appendChild(cardEl);
            cardEl.appendChild(bodyEl);
            bodyEl.appendChild(titleEl);
            bodyEl.appendChild(tempEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(windEl);

            //giving the forecast the user typed information
            fiveDay(weatherSearch);
            //giving the UV index the lon and lat information from this fetch
            findUVIndex(data.coord.lat, data.coord.lon);
              //console.log(data);
        })
}

//function to get the 5 day forecast
function fiveDay(weatherSearch) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherSearch + 
    "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        //console.log(data);
        //creating the "5-Day Forecast" title
        var futureEl = document.getElementById("future-weather");
        var forecastText = document.createElement("h5");
        $(forecastText).addClass("mt-3");
        forecastText.innerHTML = "5-Day Forecast:";
        futureEl.innerHTML = '';
        futureEl.appendChild(forecastText);
    
        //for loop so the forecast is different, and then only getting these forecast
        for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        
        //make the information appear in the html
        //creating elements and classes to hold the data fetched from weather forecast
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
        var forecastHumidEl = document.createElement("p");
        $(forecastHumidEl).addClass("text");

        //creating the <img> element the icon will be stored in when fetched
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
        
        //putting the information needed from the API fetch into the cards
        forecastTitleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
        forecastTempEl.textContent = "Temp: " + data.list[i].main.temp + " °F";
        forecastHumidEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        //appending all created elements to the HTML to be shown on the page
        futureEl.appendChild(forecastContainerEl);
        forecastContainerEl.appendChild(forecastCardEl);
        forecastBodyEl.appendChild(forecastTitleEl);
        forecastBodyEl.appendChild(iconEl);
        forecastCardEl.appendChild(forecastBodyEl);
        forecastBodyEl.appendChild(forecastTempEl);
        forecastBodyEl.appendChild(forecastHumidEl);
            }
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
        //creating a <p> element to say UV Index
        var bodyUVEl = document.querySelector(".body");
        var uvEl = document.createElement("p");
        uvEl.textContent = "UV Index: ";

        //creating a span to store the uv index number, making it a btn so its easier to style using bootstrap
        var uvColorEl = document.createElement("span");
        $(uvColorEl).addClass("btn", "btn-sm");
        uvColorEl.innerHTML = data.value;

        //if statements to tell if the UV index is dangerous or not
        if (data.value < 3) {
            $(uvColorEl).addClass("btn-success");
          }
          else if (data.value < 7) {
            $(uvColorEl).addClass("btn-warning");
          }
          else {
            $(uvColorEl).addClass("btn-danger");
          }
          //appending UV index to page
        bodyUVEl.appendChild(uvEl);
        uvEl.appendChild(uvColorEl);
    })
}


//on click run getWeatherSearch function
document.querySelector("#search-button").addEventListener("click", getWeatherSearch);


