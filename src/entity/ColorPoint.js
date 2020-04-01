export default class ColorPoint extends Point {
    constructor(x, y, color) {
        // this.color = color; // ReferenceError
        super(x, y);
        this.color = color; // 正确
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}