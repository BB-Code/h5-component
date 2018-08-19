var H5ComponentBar = function (name, config) {
    var component = new H5ComponentBase(name, config);

    $.each(config.data, function (idx, item) {
        var line = $('<div class="line"></div>');
        var name = $('<div class="name"></div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per"></div>');
        name.text(item[0]);
        var width = item[1] * 100 + '%';
        var bg = '';
        if(item[2]){
            bg = 'style="background-color:'+item[2]+'"';
        }
        rate.css('width', width);
        rate.html('<div class="bg" '+bg+'></div>');
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);
    })

    return component;

}