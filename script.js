var apiKey = "af82d5a25061873accbbaaf6cb52f8c5";

$(document).ready(function() {
  //sample for city and date
  //$("#current-city").text(CityName + " " + date + " " + img);
  // selectors
  //variables
  $(".btn").on("click", function(event) {
    event.preventDefault();
    var input = $(".form-control");
    var currentDate = moment().format("LL");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.val() +
      "&units=imperial&appid=" +
      apiKey;
    //get API data

    $.ajax({ url: queryURL, type: "GET" }).then(function(response) {
      $(".current-city").text(input.val() + " (" + currentDate + ")");
      $("#temp").text("Tempeture : " + response.main.temp + " °F");
      $("#hum").text("Humidity : " + response.main.humidity + " %");
      $("#windy").text("Wind Speed : " + response.wind.speed + " MPH");
      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);
      input.val("");
      getUV(response.coord.lat, response.coord.lon);
    });
  });
});
function getUV(lat, lon) {
  var uvIndexURL =
    "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
    apiKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&cnt=1";
  $.ajax({ url: uvIndexURL, type: "GET" }).then(function(response) {
    $("#uv").text("UV-index : " + response[0].value);
  });
}
