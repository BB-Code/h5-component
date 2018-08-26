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
        if (typeof this.whenAddPage === 'function') {
            this.whenAddPage();
        }
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
            case 'polyline':
                component = new H5ComponentPolyline(name, config);
                break;
            case 'pie':
                component = new H5ComponentPie(name, config);
                break;
            case 'bar':
                component = new H5ComponentBar(name, config);
                break;
            case 'bar_v':
                component = new H5ComponentBar_v(name, config);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, config);
                break;
            case 'ring':
                component = new H5ComponentRing(name, config);
                break;
            case 'point':
                component = new H5ComponentPoint(name, config);
                break;
            default:
                ;
        }
        page.append(component);
        return this;
    };
    this.loader = function (firstPage) {
        this.el.fullpage({
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if (firstPage) {
            $.fn.fullpage.moveTo(firstPage);
        }
    };
    return this;
}
