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
            // var todayContainerEl = document.getElementById("today-weather");
            // //empty out the div
            // todayContainerEl = innerHTML = '';



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

