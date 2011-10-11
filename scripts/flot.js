/*
* Для интеграла 
*/
var aPoints = [];
var aRadiuses = [];

function getY(Rmax, Rmin){
	var i = Rmin;
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
// вычисление первой модели
    iIdealRadius = getIdealRadius();
    $('#model1').html(' = ' + _floor(getIdealRadius()));
// вычисление второй модели
    aRadiuses = calcRadiuses();
    sHtml = 'R = [';
    for (var i = 0; i < aRadiuses.length-1; i++)
        sHtml += _floor(aRadiuses[i]) + ', ';
    sHtml += _floor(aRadiuses[7]) + ']';
    $('#model2').html(sHtml);
// вычисление третьей модели
    var oPlot = $.plot($('#model3'), [
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
      });
}

function makePlot() {
    setVariables($('#height').val(), $('#power').val(), $('#h0').val(), $('#h2').val(), $('#N').val() );
    aRadiuses = getRadiuses(calcRadiuses()); 
    getY(_floor(aRadiuses[0]), _floor(aRadiuses[1]));
    draw_plot();
}
