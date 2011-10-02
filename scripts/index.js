function toForm(sFormName) {
    $.post('pages/' + sFormName + '.phtml', null,
        function (data) {
            $('#content').html(data);
        });
}

function menuClick(oClicked) {
    $('.selected').removeClass();
    oClicked.className = 'selected';
    toForm(oClicked.id);
}
