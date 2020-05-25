// 运动
let timer
export default class Anime {
    constructor() {

        let {
            // x,
            // y,
            o = [0, 0],
                r = 50,
                a = 0,
                n = 3,
                width,
                height,
                speed,
                animate = "move2,bounce",
                shape
        } = options

        let [x, y] = o
        this.x = x
        this.y = y
        // 中点 //[x,y]
        this.o = o
        //半径
        this.r = r
        // 角度
        this.a = a
        //速度   
        this.vx = Math.random();
        this.vy = Math.random();
        this.va = Math.random() //* 10
        this.speed = speed || Math.random()
        // 方向
        this.dirX = 1
        this.dirY = 1

        // 活动范围
        this.width = width
        this.height = height

        this.animate = animate
        this.shape = shape
        this.n = n
        this.index = 0

    }

    ///匀速动画


    uniformSpeed({
        x,
        y,
        speed = 1
    }) {
        let direction = 1
        // if(x)
        timer = setInterval(() => {

            x += speed * direction
            y += speed * direction

        })
        // if(Math.abs(ele.offsetLeft-target) > speed){
        //  clearInterval(ele.timer); //保证元素此动画计时器不重复
        //  var dir=ele.offsetLeft<target ? 1 : -1; //确定运动方向
        //  ele.timer=setInterval(function(){
        //   ele.style.left=ele.offsetLeft+dir*speed+"px";
        //   if(Math.abs(ele.offsetLeft-target)<=speed){ //快到达时微调到具体位置
        //    ele.style.left=target+"px";
        //    clearInterval(ele.timer);
        //   }
        //  },24);
        // }
    }

    update() {
        if (this.animate) {
            this.animate.split(",").forEach(t => {
                this[t] && this[t]()
            })
        }
        this.o = [this.x, this.y]
    }
    //反弹
    bounce() {
        // let r=this.r //边框
        if (this.width) {
            if (this.x + this.r > this.width || this.x - this.r < 0) {
                this.dirX *= -1
            }
        }

        if (this.height > 0) {
            if (this.y + this.r > this.height || this.y - this.r < 0) {
                this.dirY *= -1
            }
        }

    }
    //直线运动
    move() {
        this.x += this.speed * this.vx * this.dirX;
        this.y += this.speed * this.vy * this.dirY

    }
    //小蝌蚪游泳运动
    move2() {
        this.x += _cos(this.a) * this.speed * this.dirX;
        this.y += _sin(this.a) * this.speed * this.dirY
        this.a += Math.random() * 90 - 45;
        // this.a += Math.random() * 0.8 - 0.4;

        // if (this.x < 0 || this.x > this.w - this.radius) {
        //   return false;
        // }

        // if (this.y < 0 || this.y > this.h - this.radius) {
        //   return false;
        // }

    }
    //转动
    roll() {
        this.a += this.va
    }
    // roll2() {
    //     this.a2 += this.va2
    // }
}