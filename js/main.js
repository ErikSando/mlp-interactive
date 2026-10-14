window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("contextmenu", e => e.preventDefault());

    const gridCheckbox = document.getElementById("show-grid");
    const gridColourPicker = document.getElementById("grid-colour");

    const importButton = document.getElementById("import");
    const fileInput = document.getElementById("file-input");

    importButton.addEventListener("click", () => fileInput.click());

    const classifyButton = document.getElementById("classify");
    const labelElement = document.getElementById("label");
    const classElement = document.getElementById("class");
    const lossElement = document.getElementById("loss");

    const errorText = document.getElementById("error");
    errorCounter = 0;

    function hideError() {
        errorCounter--;
        if (errorCounter) return;
        errorText.textContent = "";
    }

    function error(text) {
        errorCounter += 1
        errorText.textContent = text;
        setTimeout(hideError, 5000);
    }

    let mlp;

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const filename = file.name;

        const reader = new FileReader();

        let err;

        reader.addEventListener("load", (e) => {
            ({ mlp, err } = importModel(e.target.result));

            if (err) error(err);
        });

        reader.readAsText(file, "UTF-8");
    });

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

    const grid = new Grid(28, 28, gridCheckbox, gridColourPicker);
    const input = new InputHandler(canvas);

    document.getElementById("clear").addEventListener("click", grid.clear);

    let mouse1Down = false;
    let mouse2Down = false;

    input.mouse1Down.addHandler(() => {
        mouse1Down = true;
        pos = input.getMousePosition();
        grid.drawAt(pos.x, pos.y);
    });

    input.mouse2Down.addHandler(() => {
        mouse2Down = true;
        pos = input.getMousePosition();
        grid.eraseAt(pos.x, pos.y);
    });

    input.mouse1Up.addHandler(() => {
        mouse1Down = false;
    });

    input.mouse2Up.addHandler(() => {
        mouse2Down = false;
    });

    input.mouseMove.addHandler(() => {
        pos = input.getMousePosition();
        if (mouse1Down) grid.drawAt(pos.x, pos.y);
        if (mouse2Down) grid.drawAt(pos.x, pos.y, true);
    });

    classifyButton.addEventListener("click", () => {
        if (!mlp) {
            error("No model has been loaded");
            return;
        }

        mlp.forwardPass(grid.getData());

        let c = mlp.getClassification();
        let loss = mlp.getLoss(labelElement.value);

        classElement.textContent = c;
        lossElement.textContent = loss;
    });

    function update(timestamp) {
        input.update();

        draw();

        requestAnimationFrame(update);
    }

    function draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, nativeW, nativeH);

        grid.draw(ctx);
    }

    requestAnimationFrame(update);
});