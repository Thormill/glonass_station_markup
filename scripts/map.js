<<<<<<< HEAD
aStations = [];

function draw_btn_click() {
    $.post('ajax/getStations.php', 
        function (data) {
            aStations = data.split(';');
//            alert(aStations);
            h1 = aStations;
            map_draw_stations();
        });
}

function map_init() {
    var myLatlng = new google.maps.LatLng(toGeo('57.35.50'), toGeo('39.54.50')); //1st elem
    var myOptions = {zoom: 10, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP}
    map = new google.maps.Map(document.getElementById('map'), myOptions);
}

function map_draw_stations() {
    R = calc();
        
	maxR_opt = {fillColor: '#00AAFF', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
   	minR_opt = {fillColor: 'red', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
    marker_opt = {map: map, icon: 'images/marker.png'}
    
    for(i = 0; i < R.length; i++){    
    /*отрисовка маркера*/
		var point = new google.maps.LatLng(toGeo('57.35.50'),toGeo('39.54.50')); //ajax_me
		marker_opt.position = point;
        marker_opt.title = 'Вышка #' + (i+1) + "\r\n" + 'Коорд.: ' + "\r\n" + 'Мощность: ';
        marker_opt.size
        var marker = new google.maps.Marker(marker_opt);
	/*отрисовка радиуса*/
		maxR_opt.center = minR_opt.center = point;    
		radius = get(R[i]);

		maxR_opt.radius = radius[0] / 100;
		circle = new google.maps.Circle(maxR_opt);
		circle.setMap(map);
		
		minR_opt.radius = radius[1] / 100;
		circle = new google.maps.Circle(minR_opt);
		circle.setMap(map);
	}
}
=======
aStations = [];
function draw_btn_click() {
    $.post('ajax/getStations.php', 
        function (data) {
            data = data.split(';');
            aStations = [];
            var j = 0;
            for (var i = 0; i < data.length; i++) {
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
    var oLatLng = new google.maps.LatLng(toGeo('57.46.54'), toGeo('39.24.8')); //1st elem
    var aMapOptions = {zoom: 10, scaleControl: true, center: oLatLng, mapTypeId: google.maps.MapTypeId.ROADMAP}
    oMap = new google.maps.Map(document.getElementById('map'), aMapOptions);
}

function map_draw_stations() {
    map_init();
        
	aRmaxOpt = {fillColor: '#00AAFF', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
   	aRminOpt = {fillColor: 'red', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
    aMarkerOpt = {map: oMap, icon: 'images/marker.png'}
    
    for(var i = 0; i < aStations.length; i++){    
    /* установка математики */
        setVariables(aStations[i][3], aStations[i][2]);
        aRadius = getRadiuses(calcRadiuses());
    /*отрисовка маркера*/
		var point = new google.maps.LatLng(toGeo(aStations[i][0]), toGeo(aStations[i][1]));
		aMarkerOpt.position = point;
        aMarkerOpt.title = 'Вышка #' + (i+1) + "\r\n" +
            'Коорд.: ' + aStations[i][0] + 'N ' + aStations[i][1] + "W \r\n" +
            'Мощность: ' + aStations[i][2] + "Вт \r\n" +
            'R max: ' + Math.floor(aRadius[0]*100)/100 + "м \r\n" +
            'R min: ' + Math.floor(aRadius[1]*100)/100 + "м \r\n";
        var marker = new google.maps.Marker(aMarkerOpt);
	/*отрисовка радиуса*/
		aRmaxOpt.center = aRminOpt.center = point;

		aRmaxOpt.radius = aRadius[0];
		circle = new google.maps.Circle(aRmaxOpt);
		circle.setMap(oMap);
		
		aRminOpt.radius = aRadius[1];
		circle = new google.maps.Circle(aRminOpt);
		circle.setMap(oMap);
	}
}
>>>>>>> 1cdfbf9a4ae37008d9e35c348a80614a5822a6fb
