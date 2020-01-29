//sample for city and date
//$("#current-city").text(CityName + " " + date + " " + img);

// selectors

//variables
$(".btn").on("click", function(event) {
  event.preventDefault();
  var input = $(".form-control");
  var currentDate = moment().format("LL");
  var apiKey = "af82d5a25061873accbbaaf6cb52f8c5";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input.val() +
    "&units=imperial&appid=" +
    apiKey;
  //get API data
  $.ajax({ url: queryURL, type: "GET" }).then(function(response) {
    $(".current-city").text(input.val() + " (" + currentDate + ")");
    $("#temp").text("Tempeture (F): " + response.main.temp);
    $("#hum").text("Humidity: " + response.main.humidity);
    $("#windy").text("Wind Speed: " + response.wind.speed);
    // Converts the temp to Kelvin with the below formula
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(".tempF").text("Temperature (Kelvin) " + tempF);
    input.val("");
  });
});
