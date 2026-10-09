class Grid {
    #width;
    #height;
    #data;

    constructor (width, height) {
        this.init(width, height);
    }

    init(width, height) {
        this.#width = width;
        this.#height = height;
        this.#data = new Array(width * height);

        for (let tile of this.#data) {
            tile = 0;
        }
    }

    draw(ctx) {
        const left = 0;
        const right = 1000;
        const top = 0;
        const bottom = 1000;

        ctx.globalAlpha = 1;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

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