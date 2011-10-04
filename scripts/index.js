function toForm(sFormName) {
    $.post('pages/' + sFormName + '.php', null,
        function (data) {
            $('#content').html(data);
        });
}

function menuClick(oClicked) {
    $('.selected').removeClass();
    oClicked.className = 'selected';
    toForm(oClicked.id);
}

function Validate(num) {
	var data = $('#e_coord' + num).val().split(',', 2);
	data[1] = data[1].replace(/\s/g, '');
	var reg = /^[0-9]{2}.[0-9]{2}.[0-9]{2}\((N|E)\)$/;

 	if(reg.test(data[0]))
	    if(reg.test(data[1]))
	        Save(num);
	    else 
	        alert('error in (E) ' + data[1]);
	else
	    alert('error in (N) ' + data[0]);
}

function Edit(num) {
    $('#coord' + num).html('<input type="text" value="' + $('#coord' + num).html() + '" id="e_coord' + num + '" / >');
    $('#power' + num).html('<input type="text" value="' + $('#power' + num).html() + '" id="e_power' + num + '" / >');
    $('#k' + num).html('<input type="text" value="' + $('#k' + num).html() + '" id="e_k' + num + '"></input>');
    $('#height' + num).html('<input type="text" value="' + $('#height' + num).html() + '" id="e_heights' + num + '" / >');
    $('#link' + num).html('<a href="nojs.php" onclick="Validate(' + num + ');return false">[сохранить]</a>');
}

function Save(num) {
    $.post('ajax/editStation.php', { coord : $('#e_coord' + num).val(), number : num,
                                     power : $('#e_power' + num).val(), k : $('#e_k' + num).val(),
                                     heights : $('#e_heights' + num).val()},
      function (data) {
          alert(data);
      });     
    $('#coord' + num).html($('#e_coord' + num).val());
    $('#power' + num).html($('#e_power' + num).val());
    $('#k' + num).html($('#e_k' + num).val());
    $('#height' + num).html($('#e_heights' + num).val());
    $('#link' + num).html('<a href="nojs.php" onclick="Edit(' + num +  ');return false">[редактировать]</a>\r\n' + 
        '<a href="nojs.php" id="bs-del" onclick="Del(' + num + ');return false">[удалить]</a>'
    );
}

function Del(num) {
    $.post('ajax/deleteStation.php', {number : num},
    function(data) {
		alert(data);
	});
	$('#tr' + num).remove();
}
