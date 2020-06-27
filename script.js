$(document).ready(function () {
  $("#search").on("click", function () {
    var location = $("#location").val().trim();
    console.log(location + "Best City Ever!");

    // append city to list #myCities
    var cityButton = $("<button>")
      .text(location)
      .addClass("city")
      .on("click", currentWeather);

    $("#myCities").append(cityButton);
  });
});

function currentWeather() {
  console.log(this.innerHTML);
  fetch(
    "HTTPS://api.openweathermap.org/data/2.5/weather?q=" +
      this.innerHTML +
      "&appid=0185b4bc1f916b084e58f051365fa166"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
