var apiKey = "af82d5a25061873accbbaaf6cb52f8c5";

$(document).ready(function() {
  //sample for city and date
  //$("#current-city").text(CityName + " " + date + " " + img);
  // selectors
  //variables
  $(".btn").on("click", function(event) {
    event.preventDefault();
    var input = $(".form-control");
    var city = input.val();
    var currentDate = moment().format("LL");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;

    //get API data

    $.ajax({ url: queryURL, type: "GET" }).then(function(response) {
      $(".current-city").text(city + " (" + currentDate + ")");
      $("#temp").text("Tempeture : " + response.main.temp + " °F");
      $("#hum").text("Humidity : " + response.main.humidity + " %");
      $("#windy").text("Wind Speed : " + response.wind.speed + " MPH");
      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);

      getUV(response.coord.lat, response.coord.lon);
      forecast(city);
      input.val("");
    });
  });
  //code for Uv index
  function getUV(lat, lon) {
    var uvIndexURL =
      "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
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
  // 5 days forecast codes

  function forecast(city) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey;

    $.ajax({ url: forecastURL, type: "GET" }).then(function(response) {
      var list = response.list;
      console.log(response);
      // for each iteration of our loop
      for (var i = 0; i < list.length; i = i + 8) {
        var temp = ((list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);
        var humidity = list[i].main.humidity;
        var date = new Date(list[i].dt_txt);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var formatedDate = `${month}/${day}/${year}`;
        // Creating and storing a div tag
        var col = $("<div>");
        col.addClass("col-lg-2");
        var mycard = $("<div>");
        mycard.addClass("card");
        col.append(mycard);

        // Creating a paragraph tag with the response item
        var p = $("<p>").text(formatedDate);
        var p1 = $("<p>").text("temp: " + temp + "°F");
        var p2 = $("<p>").text("humidity: " + humidity + "%");

        // Appending the paragraph and image tag to mycard
        mycard.append(p);
        //mycard.appendChild(weatherImage);
        mycard.append(p1);
        mycard.append(p2);

        // Prependng the col to the HTML page in the "#forecast" div
        $("#forecast").prepend(col);
      }
      // 1) extract data from response
      // 2) add nodes to the dom
    });
  }
});
