//link API
//put search from input into history and local storage to call back on click
//when searching call return city name date, icon, temp, humidity, wind speen and the uv index
// also with 5-day forecast, append some children
//when clicked on search history calls back what was once displayed

 var todayWeatherEl = document.getElementById("today-weather");
 var buttonEl = document.getElementById("search-btn");
 //var weatherSearch = document.getElementById("search-input").value;    
 
$("button").click(function () {
    getInfo();

});


function getInfo() {
    var weatherSearch = document.getElementById("search-input").value;

    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + weatherSearch +
        "&appid=a10604c45c58c3bf1280eb707dbe4a72")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //variable for where the information is going to display
             var todayContainerEl = document.getElementById("today-weather");
            // //empty out the div
            //todayContainerEl = innerHTML = '';
            

            //make the information appear in the html
            var cardEl = document.createElement("div");
            $(cardEl).addClass("card");
            var bodyEl = document.createElement("div")
            $(bodyEl).addClass("body");
            var titleEl = document.createElement("h1");
            $(titleEl).addClass("title");
            titleEl.textContent = data.name;
            var tempEl = document.createElement("p");
            $(tempEl).addClass("text");
            tempEl.textContent = "Temperture: " + data.main.temp + " °F";
            var humidityEl = document.createElement("p");
            $(humidityEl).addClass("text");
            humidityEl.textContent = "Humidity: " + data.main.humidity;
            var windEl = document.createElement("p");
            $(windEl).addClass("text");
            windEl.textContent = "Wind Speed: " + data.wind.speed;
            var uvEl = document.createElement("p");
            $(uvEl).addClass("text");
            uvEl.textContent = "UV index: "; 

            todayContainerEl.appendChild(cardEl);
            cardEl.appendChild(bodyEl);
            bodyEl.appendChild(titleEl);
            bodyEl.appendChild(tempEl);
            bodyEl.appendChild(humidityEl);
            bodyEl.appendChild(windEl);
            bodyEl.appendChild(uvEl);




            console.log(data);
        })
        .catch(function () {

        });
        var liEl = document.createElement("li");
        liEl.classList.add("list-group-item", "list-group-item-action");
        liEl.append(weatherSearch);
        document.querySelector(".history").appendChild(liEl);

        //console.log(weatherSearch);
}

//when you click the history
$(".history").click(function() {
    alert("you clicked.");

});

