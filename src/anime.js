///匀速动画
let timer

function uniformSpeed({
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




// export {aminte}