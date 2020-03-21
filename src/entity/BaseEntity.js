class BaseEntity {
    constructor(options) {
        let {
            // x,
            // y,
            o = [0, 0],
                r = 50,
                a = 0,
                width = 300,
                height = 300
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
        this.speed = Math.random()
        // 方向
        this.dirX = 1
        this.dirY = 1

        // 活动范围
        this.width = width
        this.height = height

    }
    //反弹
    bounce() {
        if (this.x > this.width || this.x < 0) {
            this.dirX *= -1
        }

        if (this.y > this.height || this.y < 0) {
            this.dirY *= -1
        }
    }
    //直线运动
    move() {
        this.x += this.speed * this.vx * this.dirX;
        this.y += this.speed * this.vy * this.dirY
    }
    //小蝌蚪游泳运动
    move2() {
        this.x += Math.cos(this.a) * this.speed * this.dirX;
        this.y += Math.sin(this.a) * this.speed * this.dirY
        this.a += Math.random() * 0.8 - 0.4;

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

export default BaseEntity