//获取元素

export default class Dragger {
    constructor(dragerDiv, targetDiv) {
        this.init(dragerDiv, targetDiv)
    }
    init(div, targetDiv) {
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        var isDown = false;
        //鼠标按下事件
        div.onmousedown = function (e) {
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = targetDiv.offsetLeft;
            t = targetDiv.offsetTop;
            //开关打开
            isDown = true;
            //设置样式  
            targetDiv.style.cursor = 'move';
        }
        //鼠标移动
        window.onmousemove = function (e) {
            if (isDown == false) {
                return;
            }
            //获取x和y
            var nx = e.clientX;
            var ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            var nl = nx - (x - l);
            var nt = ny - (y - t);

            targetDiv.style.left = (nl > 0 ? nl : 0) + 'px';
            targetDiv.style.top = (nt > 0 ? nt : 0) + 'px';
        }
        //鼠标抬起事件
        div.onmouseup = function () {
            //开关关闭
            isDown = false;
            targetDiv.style.cursor = 'default';
        }
    }

}