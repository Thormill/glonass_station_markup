var map, circle, circleOptions, setCenter, marker;

function initialize() {
    var myLatlng = new google.maps.LatLng(50.45127, 30.523368); //Kiev
    var myOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    map = new google.maps.Map(document.getElementById("my_map"), myOptions);
    
    setCenter = true;
    
    circleOptions = {
        fillColor:"#00AAFF",
        fillOpacity:0.5,
        strokeColor:"#FFAA00",
        strokeOpacity:0.8,
        strokeWeight:2,
        clickable:false
    }

    google.maps.event.addListener(map, 'click', function(event) {
        if (setCenter) {
            if (marker != undefined) {
                marker.setMap(null);
            }
			marker = new google.maps.Marker({
				position:event.latLng,
				clickable:false
			});
			marker.setMap(map);
            circleOptions.center = event.latLng;
            setCenter = false;
        }
        else {
            //рассчитываем расстояние между точками
            var radius = distHaversine(circleOptions.center, event.latLng)
            circleOptions.radius = radius*1000;
            if (circle != undefined) {
                circle.setMap(null);
            }
            circle = new google.maps.Circle(circleOptions);
            circle.setMap(map);
            setCenter = true;
        }
    });
}
  
function loadScript() {
    var script = document.createElement("script");
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
}

//http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
rad = function(x) {return x*Math.PI/180;}

distHaversine = function(p1, p2) {
    var R = 6371; // earth's mean radius in km
    var dLat  = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
    return d.toFixed(3);
}

window.onload = loadScript;