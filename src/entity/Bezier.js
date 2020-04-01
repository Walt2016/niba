//贝塞尔曲线

import BaseEntity from "./BaseEntity";

export default class Bezier extends BaseEntity {
    constructor(options) {
        super(options)
        this.points=[]; //pos,pos,pos,pos
        this.name='三次贝塞尔曲线'
  
    }

    initUpdate(start,end){
        var a=Math.round(Math.sqrt(Math.pow(end.x-start.x,2)+Math.pow(end.y-start.y,2)))/2,
          x1=start.x+(end.x-start.x)/2,
          y1=start.y-a,
          y2=end.y+a;
  
        this.points[1]={x:end.x,y:end.y};
        this.points[2]={x:x1,y:y1<0?0:y1};
        this.points[3]={x:start.x,y:end.y};
        this.points[3]={x:x1,y:y2>H?H:y2};
        this.x=(start.x+end.x)/2;
        this.y=(start.y+end.y)/2;
      }
  

    draw() {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        ctx.bezierCurveTo(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y, this.points[1].x, this.points[1].y);
        ctx.stroke();
        ctx.restore();
    }

    createCode(){
        var codes=['// '+this.name];
        codes.push('ctx.lineWidth='+this.lineWidth);
        codes.push('ctx.strokeStyle=\''+this.strokeStyle+'\';');
        codes.push('ctx.beginPath();');
        codes.push(`ctx.moveTo(${this.points[0].x},${this.points[0].y});`);
        codes.push(`ctx.bezierCurveTo(${this.points[2].x},${this.points[2].y},${this.points[3].x},${this.points[3].y},${this.points[1].x},${this.points[1].y});`);
        codes.push('ctx.stroke();');
        return codes.join('\n');
      }
  

}