/*基本图文组件对象*/

var H5ComponentBase = function (name,config) {
    var config = config || {};
    var id = ('h5_id_'+Math.random()).replace('.','');
    var cls = 'h5_class_' + config.type + ' h5_name_' + name;
    var component = $('<div class="h5_component '+cls+'" id="'+id+'">');
    config.text && component.text(config.text);
    config.width && component.width(config.width/2);
    config.height && component.height(config.height / 2);
    config.css && component.css(config.css);
    config.bg && component.css('backgroundImage', 'url('+config.bg+')');
    if(config.center === true){
        component.css({
            marginLeft: (config.width/4 * -1 )+ 'px',
            left:'50%'
        });
    }
    return component;
}