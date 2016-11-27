$(function () {

$.get("http://localhost:3000/api/listings", {}, function(data) {
  for(var i = 0; i < data.length; i++) {
    console.log(data[i]);
    $(`<div class="row">
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail"><img src="${data[i].imageurl}" alt="...">
            <div class="caption">
              <h3 id="address">${data[i].streetNumber + ' ' + data[i].streetName}</h3>
              <p>${data[i].neighborhood + ', ' + data[i].zipcode}</p>
              <p>${data[i].bedrooms + ' Bed, ' + data[i].bathrooms + ' Bath'}</p>
              <p>${'$' + data[i].price + '/mo'} </p>
            </div>
          </div>
        </div>
      </div>`).appendTo('body');
  }
});

});

var map;
var markers = [];
var searchResult = [];

function initMap() {
  var center = {
    lat: 34.0129821,
    lng: -118.495196
  };

  map = new google.maps.Map($('#map')[0], {
    zoom: 12,
    center: center,
    mapTypeId: 'roadmap'
  });

  $('#submitSearch').click(function(event) {
    $( "article" ).remove( ".style3" );
    deleteMarkers();
    searchResult = [];

    var city = $('#city').val();
    var minPrice = Number($('#minPrice').val());
    var maxPrice = Number($('#maxPrice').val());
    var bedrooms = Number($('#bedrooms').val());
    var bathrooms = Number($('#bathrooms').val());
    var duration = Number($('#duration').val());
    var pets = ($('#pets').val());
    var furnished = ($('#furnished').val());

    var params = {
      "city": city,
      "minPrice": minPrice,
      "maxPrice": maxPrice,
      "bedrooms": bedrooms,
      "bathrooms": bathrooms,
      "duration": duration,
      "pets": pets,
      "furnished": furnished
    }

    $.get("http://localhost:3000/api/listings", {}, function(data) {
      for (var i = 0; i < data.length; i++) {

        var match = true;

        if (params.city != data[i].city && params.city != "") {
          match = false;
        }

        //console.log('min price is', params.minPrice, 'listing at', data[i].price)
        //minPrice
        else if (data[i].price < params.minPrice && params.minPrice != "") {
          match = false;
        }
        //maxPrice
        else if (data[i].price > params.maxPrice && params.maxPrice != "") {
          match = false;
        } else if (params.bedrooms != data[i].bedrooms && params.bedrooms != "") {
          match = false;
        } else if (params.bathrooms != data[i].bathrooms && params.bathrooms != "") {
          match = false;
        } else if (params.duration != data[i].duration && params.duration != "") {
          match = false;
        }

        if (match) {
          searchResult.push(data[i])
          var latLng = {
            lat: data[i].latitude,
            lng: data[i].longitude
          }
          addMarker(latLng);
        }
      }
      console.log(searchResult);
      console.log(searchResult);
      console.log(searchResult.length);
      for (var i = 0; i < searchResult.length; i++) {
        console.log(searchResult[0].city);
        // $(document).scrollTop("550");
        $('body,html').animate({scrollTop: 556}, 800);
        $('#listingArticle').append(
          `<article class="style3"><span class="image"><img style="height: 200px;" src="${searchResult[i].imageurl}" alt="" /></span><a href="www.google.com"><h2>${searchResult[i].neighborhood}</h2><div class="content"><p>${searchResult[i].formattedAddress}</p></div></a></article>`
        )
      };
    })
  });

  // Adds a marker at the center of the map.
  addMarker(center);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

console.log(searchResult);
