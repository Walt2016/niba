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

     //  function _.pos(e, canvas) {
     //      let x = e.clientX,
     //          y = e.clientY
     //      var canvasBox = canvas.getBoundingClientRect(); //获取canvas元素的边界框
     //      return [(x - canvasBox.left) * (canvas.width / canvasBox.width), (y - canvasBox.top) * (canvas.height / canvasBox.height)]
     //  }

     import _ from '../utils'

     export default class Events {
         constructor(options) {
             let {
                 canvas,
                 ctx,
                 entity,
                 entities,
                 ui
             } = options
             this.canvas = canvas
             this.ctx = ctx
             this.entity = entity
             this.entities = entities
             this.ui = ui

             this.activeShape = null;


             //  var es = {
             //      mousedown: this._start,
             //      touchstart: this._start,
             //      mousemove: this._move,
             //      touchmove: this._move,
             //      mouseup: this._end,
             //      touchend: this._end
             //  }
             //  for (var key in es) {
             //      // canvas.addEventListener(key, es[key].bind(this))
             //  }

             canvas.addEventListener('mousedown', this.mousedown.bind(this), false);

             canvas.addEventListener('mousemove', this.mousemove.bind(this), false);

             // 删除图形
             document.body.onkeydown = this.onkeydown.bind(this);

             window.onresize = this.onResize.bind(this);

             //添加鼠标移动事件
             //  canvas.addEventListener('mousemove', this.mousemove.bind(this));

         }
         _start(e) {
             var p = _.pos(e);
             drawing = true
             current = [p];
             points = [p];
             // this._background.call(this, p)
             // this._renderGroup.call(this, p)
             // if (config.shape !== "cursor") {
             //     // this.activeShape = _.extend({},
             //     //     config, {
             //     //         points: points
             //     //     });
             // }
         }
         _move(e) {
             var p = _.pos(e);
             this._background.call(this, p)
             this._renderGroup.call(this, p)
             if (drawing) { //画 
                 if (config.shape !== "cursor") {
                     this._createPoints.call(this, p);
                     this._guidewires.call(this, p);
                 } else {
                     this._drag.call(this, p);
                 }
             }
         }
         _end(e) {
             var p = _.pos(e);
             drawing = false;
             if (config.shape !== "cursor") { //增加图形
                 this.group[this.group.length] = activeShape
             } else {
                 this._drag.call(this, p);
             }
             this._background.call(this, p)
             this._renderGroup.call(this, p)
             currPos = p;
             // console.log(points)
             console.log("end", this.group)
         }

         /*
          * On resize window event.
          */

         onResize() {
             //  console.log(innerWidth)

             this.canvas.width = window.innerWidth;
             this.canvas.height = window.innerHeight;

         }


         //  mousemove(e) {
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
                 drawing,
                 //  activeShape,
                 //  ctx,
                 entity,
                 ui
             } = this
             //  let pos = _.pos(e, canvas)

             //  if (entity.showController) {
             //      entity.pos = pos
             //  }

             if (Array.isArray(entity)) {
                 entity.forEach(t => {
                     t.follow(e)
                 })
             } else {
                 entity.follow(e)
             }


             //   console.log(pos)
             //  if (entity.followMouse) {
             //      // ui&& ui._set("o", pos)
             //      if (entity.animate) {
             //          entity.moveTo(pos)
             //      } else {
             //          entity.render(pos)
             //      }
             //  } else {
             //      entity.render()
             //  }
             this.dragStart = true
            //  this.mouseStart = pos

             //开始拖动
             //  this.dragging = true

             //  env = getEnv();
             //  activeShape = null;

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
             //  canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
             canvas.addEventListener('mouseup', this.mouseup.bind(this), false);
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
         mousemove(e) {
             let {
                 mouseEnd,
                 activeShape,
                 canvas,
                 entity,
                 dragging,
                 transform,
                 activePointIndex,
                 ui
             } = this
             let pos = _.pos(e, canvas)
             if (entity.showController) {
                 entity.pos = pos
             }

             if (dragging && entity.drag) {
                 //  ui && ui._set("o", pos)
                 entity.render(pos)
             } else if (transform && entity.drag) {
                 console.log("transform")
                 entity.points[activePointIndex] = pos
                 entity.o = entity.controler._o()
                 entity.render()
             } else {
                 if (this.dragStart) {
                     let activePointIndex = entity.render().activePointIndex
                     console.log("activePointIndex=" + activePointIndex)
                     if (activePointIndex == -1) {
                         this.dragging = false
                         this.transform = false
                     } else if (activePointIndex === 9999) {
                         this.dragging = true
                     } else {
                         this.activePointIndex = activePointIndex
                         this.dragging = false
                         this.transform = true
                     }
                 } else {
                     this.dragging = false
                 }


             }


             //  if (activeShape) {
             //      if (index > -1) {
             //          activeShape.update(index, mouseEnd);
             //      } else {
             //          activeShape.initUpdate(mouseStart, mouseEnd);
             //      }

             //      this.drawBG();
             //      if (env.guid) {
             //          this.drawGuidewires(mouseEnd.x, mouseEnd.y);
             //      }
             //      this.drawGraph();
             //  }
         }
         // 鼠标结束
         mouseup(e) {
             let {
                 activeShape,
                 canvas,
                 entity,
                 dragging,
                 ui
             } = this
             canvas.style.cursor = 'pointer';
             let pos = _.pos(e, canvas)
             if (dragging && entity.drag) {
                 ui && ui._set("o", pos)
                 entity.render(pos)
             }
             this.dragging = false
             this.dragStart = false
             this.transform = false
             //  if (activeShape) {
             //      this.drawBG();
             //      this.drawGraph();
             //      this.resetDrawType();
             //  }
             canvas.removeEventListener('mousemove', this.mousemove.bind(this), false);
             canvas.removeEventListener('mouseup', this.mouseup.bind(this), false);
         }


         //绘制背景
         drawBG() {
             let {
                 ctx
             } = this
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