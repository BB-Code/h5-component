//绘制饼图
var H5ComponentPie = function (name, config) {
    var component = new H5ComponentBase(name, config);
    //绘制网格线背景层 画圆要先关闭ctx.closePath();
    var w = config.width;
    var h = config.height;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex', 1);
    component.append(canvas);
    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    //绘制数据层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex', 2);
    component.append(canvas);

    var sAngle = Math.PI * 1.5;
    var eAngle = Math.PI * 0;
    var aAngle = Math.PI * 2; //360
    var colors = ['lightpink', 'lightblue', 'lightgreen', 'lightyellow', 'lightgray'];
    var step = config.data.length;

    for (var i = 0; i < step; i++) {
        var item = config.data[i];
        var color = item[2] || (item[2] = colors.pop());
        eAngle = sAngle + aAngle * item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(r, r);
        ctx.arc(r, r, r, sAngle, eAngle);
        ctx.fill();
        ctx.stroke();

        sAngle = eAngle;

        //加入描述文字和比例
        var text = $('<div class="text"></div>');
        text.text(config.data[i][0]);
        var per = $('<div class="per"></div>');
        per.text(config.data[i][1]*100+"%");
        text.append(per);

        var x = r + Math.sin(.6* Math.PI - sAngle) * r;
        var y = r + Math.cos(.6* Math.PI - sAngle) * r;

        if (w > x / 2) {
            text.css('left', x / 2);
        } else {
            text.css('right', (w - x) / 2);
        }
        if (y > h / 2) {
            text.css('top', y / 2);
        } else {
            text.css('bottom', (h - y) / 2);
        }
        if(config.data[i][2]){
            text.css('color', config.data[i][2]);
        }
        text.css('opacity',0);
        component.append(text);
    }

    //加蒙版
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex', 3);
    component.append(canvas);
    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    // ctx.arc(r, r, r, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.stroke();

    //生长动画
    var draw = function (per) {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.moveTo(r, r);
        if (per <= 0) {
            ctx.arc(r, r, r, 0, Math.PI * 2, true);
            component.find('.text').css('opacity', 0);
        }
        if (per <= 1) {
            ctx.arc(r, r, r, sAngle, sAngle + Math.PI * 2 * per, true);
        }
        ctx.fill();
        ctx.stroke();

        if(per>=1){
            component.find('.text').css('opacity',1 );
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