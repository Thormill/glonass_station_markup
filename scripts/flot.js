/*
* Для интеграла 
*/
var aPoints = [];
var aRadiuses = [];

function getY(height, power, Rmax, Rmin){
	var i = parseInt(Rmin);
	aPoints = [];
    do {
        if (Perr(i) > 1)
            break;
        aPoints.push([i, Perr(i)]);
        i += 100;
    } while (i < Rmax);
}

function draw_plot() {  //для отрисовки графика
    setVariables($('#height').val(), $('#power').val(), $('#h0').val(), $('#h2').val(), $('#N').val() );
    aRadiuses = [];
	aRadiuses.push(getRadiuses( calcRadiuses() ) );
          $('#Rmax').html(Math.floor(aRadiuses[0][0]));
          $('#Rmin').html(Math.floor(aRadiuses[0][1]));
    var myplot = $.plot($("#myplot"), [
        {
            data: aPoints,
            lines: { show: true },
            color: 'purple'
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
          
          $('#h0').val(h0);
          $('#h2').val(h2);
          $('#N').val(N);
          
          aRadiuses = [];
          setVariables($('#height').val(), $('#power').val() );
          aRadiuses.push(getRadiuses( calcRadiuses() ) );
          $('#Rmax').html(Math.floor(aRadiuses[0][0]));
          $('#Rmin').html(Math.floor(aRadiuses[0][1]));
      });
}

function makePlot() {
    getY( $('#height').val(), $('#power').val(), $('#Rmax').html(), $('#Rmin').html() );
    draw_plot();
}
