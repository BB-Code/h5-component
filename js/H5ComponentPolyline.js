var H5ComponentPolyline = function (name, config) {
    var component = new H5ComponentBase(name, config);


        //绘制网格线背景层
        var w = config.width;
        var h = config.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = ctx.width = w;
        canvas.height = ctx.height = h;

        //水平网格线 100份-》10份
        var step = 10;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "deeppink";
        window.ctx = ctx;
        for (var i = 0; i < step + 1; i++) {
            var y = (h / step) * i;
            ctx.moveTo(0, y);
            ctx.lineTo(w, y)
        }
        //垂直根据项目个数分
        step = config.data.length + 1;
        var text_w = w / step >> 0;
        for (var i = 0; i < step + 1; i++) {
            var x = (w / step) * i;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            if (config.data[i]) {
                var text = $('<div class="text">');
                text.text(config.data[i][0]);
                text.css('width', text_w / 2).css('left', (x / 2 - text_w / 4) + text_w / 2);
                component.append(text);
            }
        }
        ctx.stroke();
        component.append(canvas);

        //绘制折线数据数据层
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = ctx.width = w;
        canvas.height = ctx.height = h;
        component.append(canvas);
        
var draw = function (per) {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "deepskyblue";
        var x = y = 0;
        //绘点
        var row_w = (w / (config.data.length + 1));
        for (i in config.data) {
            var item = config.data[i];

            x = row_w * i + row_w;
            y = h - (item[1]*h*per);

            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //连线
        ctx.moveTo(row_w, h - (config.data[0][1]*h*per));
        for (i in config.data) {
            var item = config.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0)";
        //绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255, 59, 0, 0.1)';
        ctx.fill();
        //写数据
        for (i in config.data) {
            var item = config.data[i];
            x = row_w * i + row_w;
            y = h * (1 - item[1] * h * per);
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.fillText(((item[1] * 100) >> 0) + "%", x - 10, y - 10);
        }
        ctx.stroke();
        
    }
    component.on('afterLoad', function () {
        var  s = 0;
        for(i=0;i<100;i++){
            setTimeout(() => {
                s+=.01;
                draw(s);
            }, i*10 + 500);
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