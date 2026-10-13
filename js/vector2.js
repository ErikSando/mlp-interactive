class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalised() {
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
    }

    get inversed() {
        return new Vector2(-this.x, -this.y);
    }

    get negative() {
        return new Vector2(-this.x, -this.y);
    }

    multiplied(v) {
        if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);
        else return new Vector2(this.x * v, this.y * v);
    }

    multiply(v) {
        if (v instanceof Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        }
        else {
            this.x *= v;
            this.y *= v;
        }
    }

    divided(v) {
        if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);
        else return new Vector2(this.x / v, this.y / v);
    }

    divide(v) {
        if (v instanceof Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        }
        else {
            this.x /= v;
            this.y /= v;
        }
    }

    plus(v) {
        if (v instanceof Vector2) return new Vector2(this.x +v.x, this.y + v.y);
        else return new Vector2(this.x + v, this.y + v);
    }

    add(v) {
        if (v instanceof Vector2) {
            this.x += v.x;
            this.y += v.y;
        }
        else {
            this.x += v;
            this.y += v;
        }
    }

    minus(v) {
        if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);
        else return new Vector2(this.x - v, this.y - v);
    }

    subtract(v) {
        if (v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        }
        else {
            this.x -= v;
            this.y -= v;
        }
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    equals = (v) => this.x === v.x && this.y === v.y;
    angleTo = (v) => Math.acos(this.dot(v) / (this.magnitude * v.magnitude));
    lerp = (v, t) => this.add(v.minus(this).multiplied(t));
    copy = () => new Vector2(this.x, this.y);
    clone = () => new Vector2(this.x, this.y);

    static up = () => new Vector2(0, -1);
    static down = () => new Vector2(0, 1);
    static left = () => new Vector2(-1, 0);
    static right = () => new Vector2(1, 0);
    static one = () => new Vector2(1, 1);
    static zero = () => new Vector2(0, 0);

    static fromAngle = (angle) => new Vector2(Math.cos(angle), Math.sin(angle));
    static distanceBetween = (v1, v2) => Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    static angleBetween = (v1, v2) => Math.acos(v1.dot(v2) * (v1.magnitude * v2.magnitude));
    static lerp = (v1, v2, t) => v1.plus(v2.minus(v1).multiplied(t));
    static inverse = (v) => new Vector2(-v.x, -v.y);
}