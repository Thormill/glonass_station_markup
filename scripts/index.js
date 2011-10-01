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
