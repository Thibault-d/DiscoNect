mapboxgl.accessToken = 'pk.eyJ1IjoidGhpYmF1bHQtZGVsIiwiYSI6ImNrN3J2ZGFpbzBhMzczb21ycjNtamxjbmEifQ.H4jzajdc30ChH2RYLtkCzQ' //process.env.MAPBOX_TOKEN;

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [2.191063, 41.398460], // starting position [lng, lat]
  zoom: 13 // starting zoom
});

function getVenues() {

  let path = '/map/identify';

  axios.get(path, {
      responseType: 'text'
    })
    .then(function (res) {
      const venues = res.data.map(venues => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              venues.location.coordinates[0],
              venues.location.coordinates[1]
            ]
          },
          properties: {
            venuesName: venues.name,
            venuesAddress: venues.location.formattedAddress,
            venuesID: venues._id,
            venuesPicture: venues.picture,
            venuesDescription: venues.description,
            icon: 'shop'
          }
        };
      });

      loadMap(venues);
    });

  function loadMap(venues) {

    map.on('load', function () {
      map.loadImage(
        '/img/icon.png',
        function (error, image) {
          map.addImage('disco', image)
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: venues
              }
            },
            layout: {
              'icon-image': 'disco',
              'icon-size': 0.15,
              'text-field': '{storeId}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 4],
              'text-anchor': 'bottom'
            }
          });
        });
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    map.on('click', 'points', function (e) {
      var prp = e.features[0].properties;
      var coordinates = e.features[0].geometry.coordinates.slice();
      var popup = ' <div style="font-weight: bold; font-size: 20px">' + prp.venuesName + '</div> <br> '+ prp.venuesAddress + '</div> <br><br> ' +
        ' <p> ' + prp.venuesDescription + '</p> <br> ' +
        ' <img width="220px" height="120px" src="' + prp.venuesPicture + '"> <br> <br>  ' +
        ' <a class="btnVenue" href="/venues/events/' + prp.venuesID + '"> See all the Events </a> ';

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(popup)
        .addTo(map);
    });

    map.on('mouseenter', 'points', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'points', function () {
      map.getCanvas().style.cursor = '';
    });

  }

}

getVenues();