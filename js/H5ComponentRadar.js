var H5ComponentRadar = function (name, config) {
    var component = new H5ComponentBase(name, config);
    //绘制网格线背景层 画圆要先关闭ctx.closePath();
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    component.append(canvas);

    var r = w / 2;
    var step = config.data.length;
    var isPink = false;
    for (var s = 10; s > 0; s--) {
        ctx.beginPath();
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * (s / 10);
            var y = r + Math.cos(rad) * r * (s / 10);
            ctx.lineTo(x, y);

        }
        ctx.closePath();
        ctx.fillStyle = (isPink = !isPink) ? 'lightpink' : '#99c0ff'
        ctx.fill();

    }
    //画伞骨
    for (var i = 0; i < step; i++) {
        var rad = (2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;
        ctx.moveTo(r, r);
        ctx.lineTo(x, y)
        //输出文字 难点文字的方向
        var text = $('<div class="text">');
        text.text(config.data[i][0]);
        text.css('transition', 'all .5s ' + i*.1 + 's'); //注意.5s后面有空格
        console.log(text.css('transition'));
        if (x > w / 2) {
            text.css('left', x / 2);
        } else {
            text.css('right', (w - x) / 2 + 5);
        }
        if (y > h / 2) {
            text.css('top', y / 2);
        } else {
            text.css('bottom', (h - y) / 2 + 5);
        }
        if (config.data[i][2]) {
            text.css('color', config.data[i][2]);
        }
        text.css('opacity', 0);
        component.append(text);
    }
    ctx.strokeStyle = "#eee";
    ctx.stroke();

    //数据层
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    component.append(canvas);
    ctx.strokeStyle = "#f00";
    var draw = function (per) {
        if (per >= 1) {
            component.find('.text').css('opacity', 1);
        }
        if (per <= 1) {
            component.find('.text').css('opacity', 0);
        }
        //输出折线
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var rate = config.data[i][1];
            var x = r + Math.sin(rad) * r * rate * per;
            var y = r + Math.cos(rad) * r * rate * per;
            ctx.lineTo(x, y);

        }
        ctx.closePath();
        ctx.stroke();

        //输出数据的点
        ctx.fillStyle = "#ff7676";
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI / 360) * (360 / step) * i;
            var rate = config.data[i][1];
            var x = r + Math.sin(rad) * r * rate * per;
            var y = r + Math.cos(rad) * r * rate * per;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }
    component.on('onLoad', function () {
        var s = 0;
        for (i = 0; i < 100; i++) {
            setTimeout(() => {
                s += .01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    component.on('onLeave', function () {
        var s = 1;
        for (i = 0; i < 100; i++) {
            setTimeout(() => {
                s -= .01;
                draw(s);
            }, i * 10);
        }
    });
    return component;

}