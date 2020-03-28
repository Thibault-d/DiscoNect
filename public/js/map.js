
mapboxgl.accessToken = 'pk.eyJ1IjoidGhpYmF1bHQtZGVsIiwiYSI6ImNrN3J2ZGFpbzBhMzczb21ycjNtamxjbmEifQ.H4jzajdc30ChH2RYLtkCzQ' //process.env.MAPBOX_TOKEN;
 

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [2.191063, 41.398460], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

function getVenues(){

  let path = '/map/identify';
 
  axios.get(path, {
      responseType: 'text'
  })
  .then(function(res) {
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
          storeId: venues.name,
          icon: 'shop'
        }
      };
    });
  
    loadMap(venues);
  });

  function loadMap(venues) {

    map.on('load', function() {

      map.loadImage(
        '/img/icon.png',
        function(error, image) {
          map.addImage('cat',image)
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
              'icon-image': 'cat',
              'icon-size': 0.2,
              'text-field': '{storeId}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.9],
              'text-anchor': 'bottom'
            }
          });
        });
    });
  }

}

getVenues();
