/*散点图组件对象*/

var H5ComponentPoint = function (name, config) {
    var component = new H5ComponentBase(name, config);
    var basedata = config.data[0][1];
    $.each(config.data, function (idx, item) {
        var point = $('<div class="point point_' + idx + '"></div>');
        //point.text(item[0] + '-' + item[1]);

        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="rate" style="font-weight:normal">'+item[1]+'</div>');
        name.append(rate);
        point.append(name);

        var per = (item[1] / basedata * 100) + '%';
        point.width(per).height(per);
        if (item[2]) {
            point.css('backgroundColor', item[2])
        }
        
        if (item[3] !== undefined && item[4]) {

            point.css('left', item[3]).css('top', item[4]);
        }
        component.append(point);
    })

    return component;
}