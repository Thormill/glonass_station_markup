function draw_btn_click() {
    $.post('ajax/getStations.php', 
        function (data) {
            h1 = data.split(';'); // массив высот вышек
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
    aRadiuses = calc();
        
	aRmaxOpt = {fillColor: '#00AAFF', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
   	aRminOpt = {fillColor: 'red', fillOpacity: 0.5, strokeWeight: 0, clickable: false}
    aMarkerOpt = {map: oMap, icon: 'images/marker.png'}
    
    for(var i = 0; i < aRadiuses.length; i++){    
        aRadius = get(aRadiuses[i]);
    /*отрисовка маркера*/
		var point = new google.maps.LatLng(toGeo('57.35.50'),toGeo('39.54.50')); //ajax_me
		aMarkerOpt.position = point;
        aMarkerOpt.title = 'Вышка #' + (i+1) + "\r\n" + 
            'Коорд.: ' + "\r\n" + 
            'Мощность: ' + "\r\n" +
            'Rmax: ' + Math.floor(aRadius[0]*100)/100 + "м \r\n" +
            'Rmin: ' + Math.floor(aRadius[1]*100)/100 + "м \r\n";
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
