//获取元素
import config from '../config'
export default class Dragger {
    constructor(dragerDiv, moveDiv) {
        this.init(dragerDiv, moveDiv)
    }
    init(div, moveDiv) {
        let x = 0;
        let y = 0;
        let l = 0;
        let t = 0;
        let isDown = false;
        let limitedWidth = config.env.width
        let limitedHeight = config.env.height

        //鼠标按下事件
        div.onmousedown = (e) => {
            //获取x坐标和y坐标
            x = e.clientX;
            y = e.clientY;

            //获取左部和顶部的偏移量
            l = moveDiv.offsetLeft;
            t = moveDiv.offsetTop;
            //开关打开
            isDown = true;
            //设置样式  
            moveDiv.style.cursor = 'move';

            limitedWidth = config.env.width - moveDiv.offsetWidth
            limitedHeight = config.env.height - moveDiv.offsetHeight
        }
        //鼠标移动
        window.onmousemove = (e) => {
            if (isDown == false) {
                return;
            }
            //获取x和y
            let nx = e.clientX;
            let ny = e.clientY;
            //计算移动后的左偏移量和顶部的偏移量
            let nl = nx - (x - l);
            let nt = ny - (y - t);
            nl = nl > 0 ? nl : 0
            nt = nt > 0 ? nt : 0
            nl = nl > limitedWidth ? limitedWidth : nl
            nt = nt > limitedHeight ? limitedHeight : nt
            moveDiv.style.left = nl + 'px';
            moveDiv.style.top = nt + 'px';
        }
        //鼠标抬起事件
        div.onmouseup = window.onmouseup = () => {
            //开关关闭
            isDown = false;
            moveDiv.style.cursor = 'default';
        }
    }

}