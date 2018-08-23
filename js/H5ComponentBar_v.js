var H5ComponentBar_v = function (name, config) {
    var component = new H5ComponentBar(name, config);
    //完成 width 每个柱图中项目的宽度计算。
    var width = (100 / config.data.length) >> 0;
    component.find('.line').width(width + '%');

    $.each(component.find('.rate'), function () {
        var w = $(this).css('width');
        // 把进度区的宽度重设为高度，并且取消原来的宽度
        $(this).height(w).width('');
    });

    $.each(component.find('.per'), function () {
        // 重新调整 DOM 结构，把百分比数值(.per)添加到 进度区 (.rate)中，和色块元素(.bg)同级。
        //提示，获得 进度区 元素：$(this).prev() 
        $(this).appendTo($(this).prev());
    })
    return component;

}