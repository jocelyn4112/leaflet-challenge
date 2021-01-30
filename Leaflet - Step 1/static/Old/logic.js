// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// function createMap(earthQuakes) {

//   // Create the tile layer that will be the background of our map
//   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//   });

//   // Create a baseMaps object to hold the lightmap layer
//   var baseMaps = {
//     "Light Map": lightmap
//   };

//   // Create an overlayMaps object to hold the quake layer
//   var overlayMaps = {
//     "Earthquakes": earthQuakes
//   };

//   // Create the map object with options
//   var map = L.map("map-id", {
//     center: [40.73, -74.0059],
//     zoom: 12,
//     layers: [lightmap, earthQuakes]
//   });

//   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }

// function createMarkers(response) {

//   // Pull the quarkes off of response.data
//   //var stations = response.data.stations;
//   var equakes = response.data.equakes;

//   // Initialize an array to hold bike markers
//   //var bikeMarkers = [];
//   var quakeMarkers = [];

//   // Loop through the stations array
//   // for (var index = 0; index < stations.length; index++) {
//   //   var station = stations[index];
//     for (var index = 0; index < equakes.length; index++) {
//       var equake = equakes[index];

//     // For each station, create a marker and bind a popup with the station's name
//     // var bikeMarker = L.marker([station.lat, station.lon])
//     //   .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
//       var quakeMarker = L.marker([equake.lat, equake.lon])
//       .bindPopup("<h3>" + equake.name + "<h3><h3>Capacity: " + equake.capacity + "</h3>");

//     // Add the marker to the bikeMarkers array
//     // bikeMarkers.push(bikeMarker);
//     quakeMarkers.push(quakeMarker);
//   } 

  

//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(quakeMarkers));
// }


// // Perform an API call to the Earthquake API to get station information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
