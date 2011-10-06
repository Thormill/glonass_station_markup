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
    if ($('#change_form').is(':checked') == true) {
        $('#main').width('2500px');
        $('#map').height('3000px');
    } else {
        $('#main').width('100%');
        $('#map').height('600px');
    }
    map_init();
    
	aPoints = [];
    aRadiuses = [];
    if ($('#show_stroke').is(':checked') == true)
        iStroke = 1;
    else
        iStroke = 0;
    aRmaxOpt = {fillColor: '#00AAFF', fillOpacity: 0.2, strokeWeight: iStroke, clickable: false};
    aRminOpt = {fillColor: '#FF0000', fillOpacity: 0.4, strokeWeight: iStroke, clickable: false};
    aMarkerOpt = {map: oMap, icon: 'images/marker.png', flat: true};
    for(var i = 0; i < aStations.length; i++){
    /* создание массива координат */
    	var oPoint = new google.maps.LatLng(toGeo(aStations[i][0]), toGeo(aStations[i][1]));
        aPoints.push(oPoint);
    /* создание массива радиусов */
        setVariables(aStations[i][3], aStations[i][2]); // настройки математики
        aRadiuses.push(getRadiuses(calcRadiuses()));
        /*
        var exptable = $('#export').html();
        exptable += '<tr>';
		exptable += '<td>' + (i+1) + '</td>';
		exptable += '<td>' + aRadiuses[i][0] + '</td>';
		exptable += '<td>' + aRadiuses[i][1] + '</td>';
		exptable += '<td>' + aStations[i][3] + '</td>';//h
		exptable += '<td>' + aStations[i][2] + '</td>';//power
        exptable += '</tr>';
        $('#export').html(exptable);*/
    }

    /*отрисовка маркеров*/
    if ($('#show_markers').is(':checked') == true) {
        for(var i = 0; i < aStations.length; i++) {  
            aMarkerOpt.position = aPoints[i];
            aMarkerOpt.title = 'Вышка #' + (i+1) + "\r\n" +
                'Мощность: ' + aStations[i][2] + "кВт \r\n" +
                'Высота: ' + aStations[i][3] + "м \r\n" +
                'R max: ' + Math.floor(aRadiuses[i][0]*100)/100 + "м \r\n" +
                'R min: ' + Math.floor(aRadiuses[i][1]*100)/100 + "м";
            var oMarker = new google.maps.Marker(aMarkerOpt);
        }
    }
    
	/*отрисовка максимального радиуса*/
    if ($('#show_Rmax').is(':checked') == true) {
        for(var i = 0; i < aStations.length; i++) {  
            aRmaxOpt.center = aPoints[i];
            aRmaxOpt.radius = aRadiuses[i][0];
            circle = new google.maps.Circle(aRmaxOpt);
            circle.setMap(oMap);
        }
    }

    /*отрисовка мминимального радиуса*/
    if ($('#show_Rmin').is(':checked') == true) {
        for(var i = 0; i < aStations.length; i++) {  
            aRminOpt.center = aPoints[i];		
            aRminOpt.radius = aRadiuses[i][1];
            circle = new google.maps.Circle(aRminOpt);
            circle.setMap(oMap);
        }
    }
}

