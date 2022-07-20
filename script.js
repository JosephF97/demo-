// Script for search_results.html


$('#search_btn').on('click', function(event) {
    console.log("processing");

    event.preventDefault();
    var userQuery = $('#query').val();
    var mediaFormat = $('#format').val();

    var addressAppend = '?q=' + userQuery + '&fo=' + mediaFormat;

    document.location.replace('search_results.html'+addressAppend);
});

// take data from URL and manually split it into two parts 
var searchParametersRaw = document.location.search.split("&");
// userquery is what comes after "?q=" and before "&fo"
var userQuery = searchParametersRaw[0].substring(3,searchParametersRaw[0].length);
var mediaFormat = "FormatOfSearch"; // default for LOC API

// use conditional so that it won't attempt unless user specified something
if (searchParametersRaw[1].substring(3,searchParametersRaw[1].length) != "All") {
    //If the format is not all type then take only the specific format that comes after the "fo="
    mediaFormat = searchParametersRaw[1].substring(3,searchParametersRaw[1].length);
    //lowercase
    mediaFormat = mediaFormat.toLowerCase();
}

// log to make sure it's right
console.log(userQuery);
console.log(mediaFormat);

// build request for API
var apiUrl = 'https://www.loc.gov/' + mediaFormat + '/?q=' + userQuery + '&fo=json';

fetch(apiUrl).then(function (response){

      // Check the console first to see the response.status
      console.log(response.status);
    
      // get data
      response.json().then(function (data) {
          displayData(data);
      });
});
