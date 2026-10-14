function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

class Grid {
    #width;
    #height;
    #size;
    #data;
    #max = 255;
    strength = 1;
    thickness = 2;
    threshold = 10;
    drawGrid = true;

    #lastPos = null;

    constructor (width = 28, height = 28, checkbox = null, colourPicker = null) {
        this.init(width, height);
        this.checkbox = checkbox;
        this.colourPicker = colourPicker;
    }

    init(width, height) {
        this.#width = width;
        this.#height = height;
        this.#size = width * height;
        this.#data = new Array(this.#size);

        for (let i = 0; i < this.#data.length; i++) {
            this.#data[i] = 0;
        }
    }

    getData() {
        let data = [];

        for (let value of this.#data) {
            data.push(value / 255);
        }

        return data;
    }

    drawAt(x, y, negate = false) {
        if (this.#lastPos && Vector2.distanceBetween(this.#lastPos, new Vector2(x, y)) < this.threshold) return;
        this.#lastPos = new Vector2(x, y);

        let row = Math.floor(this.#height * y / 1000);
        let col = Math.floor(this.#width * x / 1000);

        if (row >= this.#height || col >= this.#width) return;

        let sign = negate ? -1 : 1;

        let cellw = 1000 / this.#width;
        let cellh = 1000 / this.#height;

        for (let r = 0; r < this.#height; r++) {
            for (let c = 0; c < this.#width; c++) {
                let tileCentreX = (c + 0.5) * cellw;
                let tileCentreY = (r + 0.5) * cellh;

                let distX = x - tileCentreX;
                let distY = y - tileCentreY;

                let distance = Math.sqrt(distX * distX / (cellw * cellw) + distY * distY / (cellh * cellh)) / this.thickness;
                distance = clamp(distance, 0, 1);

                let roll_off = Math.E ** -(distance ** 2);
                let increase = sign * roll_off * this.strength * this.#max * (1 - (distance));

                this.#data[r * this.#width + c] = clamp(this.#data[r * this.#width + c] + increase, 0, this.#max);
            }
        }
    }

    eraseAt(x, y) {
        
    }

    draw(ctx) {
        const left = 0;
        const right = 1000;
        const top = 0;
        const bottom = 1000;

        ctx.globalAlpha = 1;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;

        if (this.colourPicker) ctx.strokeStyle = this.colourPicker.value;

        let cellw = 1000 / this.#width;
        let cellh = 1000 / this.#height;

        for (let c = 0; c < this.#width; c++) {
            for (let r = 0; r < this.#height; r++) {
                ctx.globalAlpha = this.#data[r * this.#width + c] / this.#max;
                ctx.fillRect(c * cellw, r * cellh, cellw, cellh);
            }
        }

        if (this.checkbox && !this.checkbox.checked) return;

        ctx.globalAlpha = 1;

        ctx.beginPath();

        for (let r = 0; r <= this.#height; r++) {
            let y = top + (r / this.#height) * (bottom - top);
            ctx.moveTo(left, y);
            ctx.lineTo(right, y);
        }

        for (let c = 0; c <= this.#width; c++) {
            let x = left + (c / this.#width) * (right - left);
            ctx.moveTo(x, top);
            ctx.lineTo(x, bottom);
        }

        ctx.stroke();
    }
}