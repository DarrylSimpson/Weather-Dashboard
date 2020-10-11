
//put search from input into history and local storage to call back on click
//when searching call return city name date, icon, temp, humidity, wind speen and the uv index
// also with 5-day forecast, append some children
//when clicked on search history calls back what was once displayed

 var todayWeatherEl = document.getElementById("today-weather");
 var buttonEl = document.getElementById("search-btn");
 //var weatherSearch = document.getElementById("search-input").value;    
 
$("button").click(function () {
    getInfo();
    fiveDay();
});


function getInfo() {
    var weatherSearch = document.getElementById("search-input").value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + weatherSearch +
        "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //variable for where the information is going to display
             var todayEl = document.getElementById("today-weather");
             //empty out the div
            //todayEl = innerHTML = '';
            

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
            var uvEl = document.createElement("p");
            $(uvEl).addClass("text");
            var iconEl = document.createElement("img");
             
            //setting the information that goes within each element
            titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
            tempEl.textContent = "Temperture: " + data.main.temp + " °F";
            humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
            windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            uvEl.textContent = "UV index: ";
            iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            
            //appending all the information above into the html
            titleEl.appendChild(iconEl);
            todayEl.appendChild(cardEl);
            cardEl.appendChild(bodyEl);
            bodyEl.appendChild(titleEl);
            bodyEl.appendChild(tempEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(windEl);
            bodyEl.appendChild(uvEl);

              //console.log(data);
        })
        .catch(function () {

        });
        //creatng elements to hold the history displayed on the page after you type a city 
        var liEl = document.createElement("li");
        liEl.classList.add("list-group-item", "list-group-item-action");
        liEl.append(weatherSearch);
        document.querySelector(".history").appendChild(liEl);

}

function fiveDay() {
    weatherSearch = document.getElementById("search-input").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherSearch + 
    "&appid=a10604c45c58c3bf1280eb707dbe4a72&units=imperial")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        var futureEl = document.getElementById("future-weather");

        var futureTitleEl = document.createElement("h2");
        $(futureTitleEl).textContent = "5-Day Forecast";
        for (var i = 0; i < data.list.slice(1, 6).length; i++) {
        
        //make card for one of the days for the 5 day forecast
        var oneContainerEl = document.createElement("div");
        $(oneContainerEl).addClass("col-2");
        var oneCardEl = document.createElement("div");
        $(oneCardEl).addClass("card");
        var oneBodyEl = document.createElement("div");
        $(oneBodyEl).addClass("body");

        var oneTitleEl = document.createElement("h3");
        $(oneTitleEl).addClass("title");

        var oneTempEl = document.createElement("p");
        $(oneTempEl).addClass("text");
        var oneWindEl = document.createElement("p");
        $(oneWindEl).addClass("text");
        var oneHumidEl = document.createElement("p");
        $(oneHumidEl).addClass("text");

        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
        

        oneTitleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
        oneTempEl.textContent = "Temp: " + data.list[i].main.temp + " °F";
        oneHumidEl.textContent = "Humidity: " + data.list[i].main.humidity;
        oneWindEl.textContent = "Wind Speed: " + data.list[i].wind.speed;

        //futureEl.appendChild(futureTitleEl);
        futureEl.appendChild(oneContainerEl);
        oneContainerEl.appendChild(oneCardEl);
        oneBodyEl.appendChild(oneTitleEl);
        oneBodyEl.appendChild(iconEl);
        oneCardEl.appendChild(oneBodyEl);
        oneBodyEl.appendChild(oneTempEl);
        oneBodyEl.appendChild(oneWindEl);
        oneBodyEl.appendChild(oneHumidEl);
        
        }
        

    });

}

//when you click the history
$(".history").click(function() {
    alert("you clicked.");

});

