     //坐标转换
     function windowToCanvas(canvas, x, y) {
         var canvasBox = canvas.getBoundingClientRect(); //获取canvas元素的边界框
         return {
             x: (x - canvasBox.left) * (canvas.width / canvasBox.width), //对canvas元素大小与绘图表面大小不一致时进行缩放
             y: (y - canvasBox.top) * (canvas.height / canvasBox.height)
         }
     }
     //方法2
     function windowToCanvas2(canvas, x, y) {
         return {
             x: x + document.body.scrollLeft - document.body.clientLeft - canvas.offsetLeft,
             y: y + document.body.scrollTop - document.body.clientTop - canvas.offsetTop
         }
     }

     export default class Events {

         constructor(options) {
             let {
                 canvas,
                 ctx
             } = options
             this.canvas = canvas
             this.ctx = ctx

             canvas.addEventListener('mousedown', this.mousedown.bind(this), false);

             // 删除图形
             document.body.onkeydown = this.onkeydown

             //添加鼠标移动事件
             //  canvas.addEventListener('mousemove', this.mouseMove.bind(this));

         }


         //  mouseMove(e) {
         //      var location = windowToCanvas2(this.canvas, e.clientX, e.clientY);
         //      this.drawLines(location.x, location.y);
         //  }

         //绘制辅助线
         drawLines(x, y) {
             let {
                 ctx
             } = this
             ctx.save()
             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

             ctx.beginPath();
             ctx.strokeStyle = 'rgba(0,0,230,0.4)';
             ctx.lineWidth = 0.5;
             ctx.moveTo(x, 0);
             ctx.lineTo(x, ctx.canvas.height);
             ctx.stroke();
             ctx.beginPath();
             ctx.moveTo(0, y);
             ctx.lineTo(ctx.canvas.width, y);
             ctx.stroke();
             ctx.font = '12pt Arial';
             ctx.fillStyle = 'green';
             var text = '(' + parseInt(x) + ',' + parseInt(y) + ')';
             ctx.fillText(text, 20, 50);
             ctx.restore()
         }



         mousedown(e) {
             let {
                 canvas,
                 mouseStart,
                 drawing,
                 activeShape
             } = this
             mouseStart = windowToCanvas(canvas, e.clientX, e.clientY);
            //  env = getEnv();
             activeShape = null;

             //新建图形
             if (drawing) {
                //  activeShape = factory(env.type, mouseStart);
                //  activeShape.lineWidth = env.lineWidth;
                //  activeShape.strokeStyle = env.strokeStyle;
                //  activeShape.fillStyle = env.fillStyle;
                //  activeShape.isFill = env.isFill;
                //  activeShape.sides = env.sides;
                //  activeShape.stars = env.stars;
                //  shapes.push(activeShape);
                //  index = -1;
                //  this.drawGraph();
             } else {
                 //选中控制点后拖拽修改图形
                //  for (var i = 0, len = shapes.length; i < len; i++) {
                //      if ((index = shapes[i].isInPath(ctx, mouseStart)) > -1) {
                //          canvas.style.cursor = 'crosshair';
                //          activeShape = shapes[i];
                //          break;
                //      }
                //  }
             }
             // saveImageData();
             canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
             canvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
         }
         onkeydown(e) {
             if (e.keyCode == 8) {
                //  for (var i = 0, len = shapes.length; i < len; i++) {
                //      if (shapes[i].isInPath(ctx, currPos) > -1) {
                //          shapes.splice(i--, 1);
                //          drawBG();
                //          drawGraph();
                //          break;
                //      }
                //  }
             }
         }

         // 鼠标移动
         mouseMove(e) {
             let {
                 mouseEnd,
                 activeShape
             } = this
             mouseEnd = windowToCanvas(canvas, e.clientX, e.clientY);
             if (activeShape) {
                 if (index > -1) {
                     activeShape.update(index, mouseEnd);
                 } else {
                     activeShape.initUpdate(mouseStart, mouseEnd);
                 }

                 this.drawBG();
                 if (env.guid) {
                     this.drawGuidewires(mouseEnd.x, mouseEnd.y);
                 }
                 this.drawGraph();
             }
         }
         // 鼠标结束
         mouseUp(e) {
             let {
                 activeShape,
                 canvas
             } = this
             canvas.style.cursor = 'pointer';
             if (activeShape) {
                 this.drawBG();
                 this.drawGraph();
                 this.resetDrawType();
             }
             canvas.removeEventListener('mousemove', this.mouseMove.bind(this), false);
             canvas.removeEventListener('mouseup', this.mouseUp.bind(this), false);
         }


         //绘制背景
         drawBG() {
             let {ctx}=this
             ctx.clearRect(0, 0, W, H);
            //  if (getEnv().grid) {
            //      this.DrawGrid(ctx, 'lightGray', 10, 10);
            //  }
         }
         //网格
         drawGuidewires(x, y) {
             ctx.save();
             ctx.strokeStyle = 'rgba(0,0,230,0.4)';
             ctx.lineWidth = 0.5;
             ctx.beginPath();
             ctx.moveTo(x + 0.5, 0);
             ctx.lineTo(x + 0.5, ctx.canvas.height);
             ctx.stroke();
             ctx.beginPath();
             ctx.moveTo(0, y + 0.5);
             ctx.lineTo(ctx.canvas.width, y + 0.5);
             ctx.stroke();
             ctx.restore();
         }
         //绘制图形列表
         drawGraph() {
            //  var showControl = getEnv().control;
            //  shapes.forEach(shape => {
            //      shape.draw(ctx);
            //      if (showControl) {
            //          shape.drawController(ctx);
            //      }
            //  });
         }

     }