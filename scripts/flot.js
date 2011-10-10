/*
* Для интеграла 
*/
var aPoints = [];
var aRadiuses = [];

function getY(height, power, Rmax, Rmin){
	var i = parseInt(Rmin);
	aPoints = [];
	alert(Perr(8569 + 1500));
    do {
        if (Perr(i) > 1)
            break;
        aPoints.push([i, Perr(i)]);
  //      alert('x: ' + i + '; y: ' + Perr(i))
        i += 100;
    } while (i < Rmax);
}

function draw_plot() {  //для отрисовки графика
    var myplot = $.plot($("#myplot"), [
        {
            data: aPoints,
            lines: { show: true },
            color: 'red'
        }
    ]);
}

function getParams(num) {
    $.post('ajax/getOneStation.php', {num : num},
      function (data) {
		  param = data.split(';', 7);
		  $('#frequency_in').val(param[0]);
          $('#frequency_out').val(param[1]);
          $('#power').val(param[2]);
          $('#k').val(param[3]);
          $('#angle').val(param[4]);
          $('#height').val(param[5]);
          $('#absolute_height').val(param[6]);
          
          aRadiuses = [];
          setVariables($('#height').val(), $('#power').val() );
          aRadiuses.push(getRadiuses( calcRadiuses() ) );
          $('#Rmax').val(Math.floor(aRadiuses[0][0]));
          $('#Rmin').val(Math.floor(aRadiuses[0][1]));
      });
}

function makePlot() {
    getY( $('#height').val(), $('#power').val(), $('#Rmax').val(), $('#Rmin').val() );
    draw_plot();
}
