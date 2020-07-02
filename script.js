$(document).ready(function () {
  $("#search").on("click", function () {
    var location = $("#location").val().trim();
    console.log(location);

    // append city to list #myCities
    var cityButton = $("<button>")
      .text(location)
      .addClass("city")
      .on("click", function (e) {
        getSearch(e.target.textContent);
      });

    $("#myCities").append(cityButton);
    $("#location").val("");
  });
});

function getSearch(location) {
  currentWeather(location);
  getForcast(location);
}

function currentWeather(city) {
  console.log(city);
  fetch(
    "HTTPS://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=0185b4bc1f916b084e58f051365fa166"
  )
    .then((response) => response.json())
    .then((data) => {
      //for (let i = 0; i < data.list.length; i++) {
      // current day data

      //clear out old data
      var todayEl = document.querySelector("#current-weather");
      todayEl.textContent = "";

      //create content for currentWeather
      var titleEl = document.createElement("h2");
      titleEl.classList.add("card-title");
      titleEl.textContent =
        data.name + "(" + new Date().toLocaleDateString() + ")";
      var card = document.createElement("div");
      card.classList.add("card");

      var windEl = document.createElement("p");
      windEl.classList.add("card-text");
      var humidEl = document.createElement("p");
      humidEl.classList.add("card-text");
      var tempEl = document.createElement("p");
      tempEl.classList.add("card-text");

      // humidEl.textContent = "Humidity: " + data.main.humidity + "%";
      windEl.textContent = `Wind Speed: ${data.wind.speed} MPH`;
      humidEl.textContent = `Humidity: ${data.main.humidity}%`;
      if (data.main.temp) {
        tempEl.textContent = `Temp: ${data.main.temp}`;
      }

      var cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");

      // img element
      var imgEl = document.createElement("img");
      imgEl.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );

      titleEl.appendChild(imgEl);
      cardBodyEl.appendChild(titleEl);
      cardBodyEl.appendChild(tempEl);
      cardBodyEl.appendChild(humidEl);
      cardBodyEl.appendChild(windEl);
      card.appendChild(cardBodyEl);
      todayEl.appendChild(cardBodyEl);
    });
}
// end currentWeather;

function getForcast(city) {
  fetch(
    "HTTPS://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=0185b4bc1f916b084e58f051365fa166"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let forecast = document.querySelector("#forecast");
      forecast.textContent = "";

      forecastRow = document.createElement("div");

      var foreHead = document.createElement("h4");
      foreHead.textContent = "5-Day Forecast:";

      forecast.classList.add("row");

      for (let i = 0; i < data.list.length; i++) {
        const currentDay = data.list[i];
        // make boostrap card
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var newDay = document.createElement("div");
          newDay.classList.add("card");
          var foreCardEl = document.createElement("div");
          foreCardEl.classList.add("card-body");

          //date
          var foreDate = document.createElement("h3");
          foreDate.classList.add("card-title");
          foreDate.textContent =
            "(" + new Date(data.list[i].dt_txt).toLocaleDateString() + ")";

          // icon
          var newIcon = document.createElement("img");
          newIcon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              currentDay.weather[0].icon +
              ".png"
          );

          // temp
          var newTemp = document.createElement("p");
          newTemp.classList.add("card-text");

          // humidity
          var newHumid = document.createElement("p");
          newHumid.classList.add("card-text");

          if (currentDay.main.temp) {
            newTemp.textContent = `Temp: ${currentDay.main.temp}`;
          }
          newHumid.textContent = `Humidity: ${currentDay.main.humidity}%`;

          foreCardEl.appendChild(newIcon);
          foreCardEl.appendChild(foreDate);
          foreCardEl.appendChild(newTemp);
          foreCardEl.appendChild(newHumid);
          newDay.appendChild(foreCardEl);
          forecast.appendChild(newDay);
        }
      }
    });
}
