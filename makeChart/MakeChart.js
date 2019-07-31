/**
* canvas画饼形图
*/
class CircleChart {
  /**
   * @param {String} target canvas id
   * @param {number} width width
   * @param {number} height height
   * @param {Array} data 饼形图各项目所占百分比 element总数和为1
   * @param {String} tips 各项说明 与data一一对应
   */
  constructor(target, width, height, data = [], tips = null) {
    const CANVAS = document.getElementById(target);
    CANVAS.width = width;
    CANVAS.height = height;
    this.ctx = CANVAS.getContext('2d');

    this.DEG = Math.PI / 180;
    this.half_width = width / 2;
    this.half_height = height / 2;
    this.data = data;
    this.colorArr = [];
    if (!tips) {
      this.makeColorArr(data.length);
    } else {
      this.colorArr = tips;
    }
    this.makeChart();
  }
  makeColor() {
    // 随机生成颜色
    let r = Math.floor(Math.random() * 256).toString(16);
    let g = Math.floor(Math.random() * 256).toString(16);
    let b = Math.floor(Math.random() * 256).toString(16);
    console.log('r', r.toString(16), 'g', g.toString(16), 'b', b.toString(16));
    r = r.length === 1 ? `0${r}` : r;
    g = g.length === 1 ? `0${g}` : g;
    b = b.length === 1 ? `0${b}` : b;
    let color = `#${r}${g}${b}`;
    return color;
  }
  /**
   * 
   * @param {number} length 需要生成颜色的个数
   */
  makeColorArr(length = 0) {
    // 将随机颜色根据length长度装入数组并去重,避免生成重复颜色
    for (let i = 0; i < length; i++) {
      this.colorArr.push(this.makeColor());
    }
    let _length = [...new Set(this.colorArr)].length;
    if (_length !== length) {
      this.makeColorArr(length - _length);
    }
    console.log(this.colorArr);
  }
  makeChart() {
    let start = 0;
    this.ctx.save();
    this.data.forEach((item, index) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.colorArr[index];
      this.ctx.moveTo(this.half_width, this.half_height);
      this.ctx.arc(
        this.half_width,
        this.half_height,
        this.half_width > this.half_height ? this.half_height : this.half_width,
        this.getRads(360 * start),
        this.getRads(360 * (start + item))
      );
      this.ctx.closePath();
      this.ctx.fill();
      start = start + item;
    });
    // 画内部圆心
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.moveTo(this.half_width, this.half_height);
    this.ctx.arc(
      this.half_width,
      this.half_height,
      this.half_width > this.half_height ? this.half_height - 50 : this.half_width - 50,
      0,
      this.getRads(360)
    );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
  // 工具函数 转换角度为弧度
  getRads(degrees) {
    return (Math.PI * degrees) / 180;
  }
}
