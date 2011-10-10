/*
* Для интеграла 
*/
function getY(height, power){
	var i = 20000;
    do {
        setVariables(height, power);
        if (Perr(i) > 1)
            break;
        alert(Perr(i) + "\n\r");
        i += 500;
    } while (i < 60000);
}

$(function () {  //для отрисовки графика
    var d4 = [];
    for (var i = 0; i < 14; i += 0.1)
        d4.push([i, Math.sqrt(i * 10)]);
                        
    var myplot = $.plot($("#myplot"), [
        {
            data: d4,
            lines: { show: true },
            color: 'red'
        }
    ]);
});

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
      });
}
