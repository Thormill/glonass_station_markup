aStations = [];
function draw_btn_click() {
    $.post('ajax/getStations.php', 
        function (data) {
            data = data.split(';');
            aStations = [];
            var j = 0;
            for (var i = 0; i < data.length-1; i++) {
                aStations.push([0,0,0,0]);
                aStations[j][0] = data[i];
                aStations[j][1] = data[i+1];
                aStations[j][2] = data[i+2];
                aStations[j][3] = data[i+3];
                j++; i += 3;
            }
            map_draw_stations();
        });
}

function map_init() {
    var oLatLng = new google.maps.LatLng(53, 45); //1st elem
    var aMapOptions = {zoom: 5, scaleControl: true, center: oLatLng, mapTypeId: google.maps.MapTypeId.ROADMAP}
    oMap = new google.maps.Map(document.getElementById('map'), aMapOptions);
}

function map_draw_stations() {
    map_init();
        
	aRmaxOpt = {fillColor: '#00AAFF', fillOpacity: 0.6, strokeWeight: 0, clickable: false}
   	aRminOpt = {fillColor: 'red', fillOpacity: 0.6, strokeWeight: 0, clickable: false}
    aMarkerOpt = {map: oMap, icon: 'images/marker.png', flat: true}
    
    for(var i = 0; i < aStations.length; i++){    
    /* установка математики */
        setVariables(aStations[i][3], aStations[i][2]);
        aRadius = getRadiuses(calcRadiuses());
    /*отрисовка маркера*/
		var oPoint = new google.maps.LatLng(toGeo(aStations[i][0]), toGeo(aStations[i][1]));
        if ($('#show_markers').is(':checked') == true)
        {
            aMarkerOpt.position = oPoint;
            aMarkerOpt.title = 'Вышка #' + (i+1) + "\r\n" +
                'Мощность: ' + aStations[i][2] + "кВт \r\n" +
                'Высота: ' + aStations[i][3] + "м \r\n" +
                'R max: ' + Math.floor(aRadius[0]*100)/100 + "м \r\n" +
                'R min: ' + Math.floor(aRadius[1]*100)/100 + "м";
            var oMarker = new google.maps.Marker(aMarkerOpt);
        }
	/*отрисовка радиуса*/
		aRmaxOpt.center = aRminOpt.center = oPoint;

		aRmaxOpt.radius = aRadius[0];
		circle = new google.maps.Circle(aRmaxOpt);
		circle.setMap(oMap);
		
		aRminOpt.radius = aRadius[1];
		circle = new google.maps.Circle(aRminOpt);
		circle.setMap(oMap);
	}
}
