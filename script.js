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
    console.log(response);
    $(".current-city").text(input.val() + " (" + currentDate + ")");
    input.val("");
  });
});
