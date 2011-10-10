$(function () {
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
