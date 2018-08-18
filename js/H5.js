var H5 = function () {
    this.id = ("h5_" + Math.random()).replace('.', '');
    this.el = $('<div class="h5" id="' + this.id + '">').hide();
    this.page = [];
    $('body').append(this.el);
    this.addPage = function (name, text) {
        var page = $('<div class="h5_page section">');
        if (name != undefined) {
            page.addClass('h5_page_' + name);
        }
        if (text != undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    };
    this.addComponent = function (name, config) {
        var config = config || {};
        config = $.extend({
            type: 'base'
        }, config);
        var component; //存储组件元素
        var page = this.page.slice(-1)[0];
        switch (config.type) {
            case 'base':
                component = new H5ComponentBase(name, config);
                break;
            default:
                break;
        }
        page.append(component);
        return this;
    };
    this.loader = function () {
        this.el.fullpage({
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('afterLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('afterLoad');
        this.el.show();

    };
    return this;
}