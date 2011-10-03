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

function Edit(num) {
    var tmp = $('#coord' + num).html();
    $('#coord' + num).html('<input type="text" value="' + tmp + '" id="e_coord' + num + '" / >');
    $('#power' + num).html('<input type="text" value="' + $('#power' + num).html() + '" id="e_power' + num + '" / >');
    $('#k' + num).html('<input type="text" value="' + $('#k' + num).html() + '" id="e_k' + num + '"></input>');
    $('#height' + num).html('<input type="text" value="' + $('#height' + num).html() + '" id="e_heights' + num + '" / >');
    $('#link' + num).html('<a href="nojs.php" onclick="Save(' + num + ');return false">сохранить</a>');
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
    $('#link' + num).html('<a href="nojs.php" onclick="Edit(' + num +  ');return false">редактировать</a>');

}
