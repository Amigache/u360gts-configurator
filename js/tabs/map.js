var radius = 20;
var defaultCenter = [8.535850, 47.403583];

// create a layer with the OSM source
var layer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

// center on london, transforming to map projection
var center = ol.proj.transform(defaultCenter, 'EPSG:4326', 'EPSG:3857');

// view, starting at the center
var view = new ol.View({
    center: center,
    zoom: 18
});

// ICONS

var iconFeatures = [];

var iconTrackerFeature = new ol.Feature({
    geometry: new ol.geom.Point(center),
    name: 'Tracker'
});

iconFeatures.push(iconTrackerFeature);

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        scale: 0.15,
        src: '/images/icons/tracker-map-icon.png'
    }))
});

var iconsSource = new ol.source.Vector({
    projection: 'EPSG:4326',
    features: iconFeatures //add an array of features
});

var iconsLayer = new ol.layer.Vector({
    source: iconsSource,
    style: iconStyle
});

// SIM HELPERS
var helperFeatures = [];

var circle = new ol.geom.Circle(center, radius);
var circleFeature = new ol.Feature(circle);

helperFeatures.push(circleFeature);

var helperSource = new ol.source.Vector({
    projection: 'EPSG:4326',
    features: helperFeatures //add an array of features
});

var helperLayer = new ol.layer.Vector({
    source: helperSource
});

//var centerLongitudeLatitude = ol.proj.fromLonLat([8.535850, 47.403583]);
//var layer = new ol.layer.Vector({
//  source: new ol.source.Vector({
//    projection: 'EPSG:4326',
//    features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, 4000))]
//  }),
//  style: [
//    new ol.style.Style({
//      stroke: new ol.style.Stroke({
//        color: 'blue',
//        width: 3
//      }),
//      fill: new ol.style.Fill({
//        color: 'rgba(0, 0, 255, 0.1)'
//      })
//    })
//  ]
//});

// finally, the map with our custom interactions, controls and overlays
var map = new ol.Map({
    target: 'map',
    layers: [layer, helperLayer, iconsLayer],
    view: view,
    units: 'm'
});

window.addEventListener('message', function (e) {
    var data = e.data;
    var origin = e.origin;
});

window.addEventListener('message', function (e) {
    var mainWindow = e.source;
    var result = '';
    try {
        switch (e.data.action) {
            case 'zoom_in':
                var zoom = map.getZoom();
                zoom++;
                map.setZoom(zoom);
                break;
            case 'zoom_out':
                var zoom = map.getZoom();
                zoom--;
                map.setZoom(zoom);
                break;
            case 'center':
                iconTrackerFeature.setGeometry(new ol.geom.Point(ol.proj.transform([e.data.lon, e.data.lat], 'EPSG:4326', 'EPSG:3857')));
                //view.setCenter(ol.proj.transform([e.data.lon, e.data.lat], 'EPSG:4326', 'EPSG:3857'));
        }
    } catch (e) {
        console.log('message error');
    }
});


//addMarker(8.535850, 47.403583);

//function loadMapScript() {
//    var script = document.createElement('script');
//    script.type = 'text/javascript';
//    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=initialize';
//    document.head.appendChild(script);
//}
//
//window.onload = loadMapScript;
//
//var map;
//var marker;
//var circle;
//
//function zoom_in() {
//    var zoom = map.getZoom();
//    zoom++;
//    map.setZoom(zoom);
//}
//
//function initialize() {
//
//    var mapOptions = {
//        zoom: 17,
//        zoomControl: false,
//        streetViewControl: false,
//        center: {lat: 47.403583, lng: 8.535850}
//    };
//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//
//    var image = {
//        url: '/images/icons/tracker-map-icon.png',
//        scaledSize: new google.maps.Size(40, 40),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(40 / 2, 40 / 2)
//    };
//
//    var icon = {
//        url: '/images/icons/tracker-map-icon.png',
//        size: new google.maps.Size(40, 40),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(40 / 2, 40 / 2)
//    };
//
//    circle = new google.maps.Circle({
//        center: {lat: 47.403583, lng: 8.535850},
//        radius: 20,
//        strokeColor: "#FF0000",
//        strokeOpacity: 0.8,
//        strokeWeight: 2,
//        fillColor: "#FF0000",
//        fillOpacity: 0.35,
//        map: map
//    });
//
//    marker = new google.maps.Marker({
//        icon: image,
//        position: new google.maps.LatLng(47.403583, 8.535850),
//        map: map
//    });
//
//    var infowindow = new google.maps.InfoWindow();
//
//    google.maps.event.addListener(marker, 'click', function () {
//        infowindow.setContent('<p>Your Location: ' + map.getCenter() + '</p>');
//        infowindow.open(map, marker);
//    });
//
//    window.addEventListener('message', function (e) {
//        var data = e.data;
//        var origin = e.origin;
//    });
//}

