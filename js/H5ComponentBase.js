/*基本图文组件对象*/

var H5ComponentBase = function (name, config) {
    var config = config || {};
    var id = ('h5_id_' + Math.random()).replace('.', '');
    var cls = ' h5_component_' + config.type;
    var component = $('<div class="h5_component ' + cls + ' h5_component_name_' + name + '" id="' + id + '">');
    config.text && component.text(config.text);
    config.width && component.width(config.width / 2);
    config.height && component.height(config.height / 2);
    config.css && component.css(config.css);
    config.bg && component.css('backgroundImage', 'url(' + config.bg + ')');
    if (config.center === true) {
        component.css({
            marginLeft: (config.width / 4 * -1) + 'px',
            left: '50%'
        });
    }
    if(typeof config.click === 'function'){
        component.on('click',config.click);
    }
    component.on('onLeave', function () {
        setTimeout(function () {
            component.addClass(cls + '_leave').removeClass(cls + '_load');
            config.animateOut && component.animate(config.animateOut);
        }, config.delay || 0);

        return false;
    });
    component.on('onLoad', function () {
        setTimeout(function () {
            component.addClass(cls + '_load').removeClass(cls + '_leave');
        }, config.delay || 0);
        config.animateIn && component.animate(config.animateIn);
        return false;
    });


    return component;
}