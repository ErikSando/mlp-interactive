window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const nativeW = 1000;
    const nativeH = 1000;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        ctx.setTransform(canvas.width / nativeW, 0, 0, canvas.height / nativeH, 0, 0);

        ctx.imageSmoothingEnabled = false;
    }

    window.addEventListener("resize", resize);
    resize();

    function update(timestamp) {
        draw();

        requestAnimationFrame(update);
    }

    const grid = new Grid(28, 28);

    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(-1, -1, nativeW, nativeH);

        grid.draw(ctx);
    }

    requestAnimationFrame(update);
});