$(document).ready(function () {
  $("#search").on("click", function () {
    var location = $("#location").val().trim();
    console.log(location + "Best City Ever!");

    // append city to list #myCities
    var cityButton = $("<button>")
      .text(location)
      .addClass("city")
      .on("click", getSearch);

    $("#myCities").append(cityButton);
  });
});

function getSearch() {
  let searchVal = document.querySelector("#location").value;
  currentWeather(searchVal);
  getForcast(searchVal);
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
      var titleEl = document.createElement("h3");
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
//currentWeather("Los Angeles");

function getForcast(searchVal) {
  fetch(
    "HTTPS://api.openweathermap.org/data/2.5/forecast?q=" +
      searchVal +
      "&appid=0185b4bc1f916b084e58f051365fa166&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      let forecast = document.querySelector("#forecast");
      forecastRow = document.createElement("div");
      forecast.classList.add("row");

      for (let i = 0; i < data.list.length; i++) {
        const currentDay = data.list[i];

        // make boostrap card

        // temp
        // icon
      }
    });
}
