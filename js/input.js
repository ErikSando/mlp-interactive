const KeyCode = {
    AltLeft: "AltLeft",
    AltRight: "AltRight",
    Apostrophe: "Apostrophe",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    ArrowUp: "ArrowUp",
    Backquote: "Backquote",
    Backslash: "Backslash",
    Backspace: "Backspace",
    BracketLeft: "BracketLeft",
    BracketRight: "BracketRight",
    CapsLock: "CapsLock",
    Comma: "Comma",
    ContextMenu: "ContextMenu",
    ControlLeft: "ControlLeft",
    ControlRight: "ControlRight",
    Delete: "Delete",
    Digit0: "Digit0",
    Digit1: "Digit1",
    Digit2: "Digit2",
    Digit3: "Digit3",
    Digit4: "Digit4",
    Digit5: "Digit5",
    Digit6: "Digit6",
    Digit7: "Digit7",
    Digit8: "Digit8",
    Digit9: "Digit9",
    End: "End",
    Enter: "Enter",
    Equal: "Equal",
    Escape: "Escape",
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    Home: "Home",
    Insert: "Insert",
    KeyA: "KeyA",
    KeyB: "KeyB",
    KeyC: "KeyC",
    KeyD: "KeyD",
    KeyE: "KeyE",
    KeyF: "KeyF",
    KeyG: "KeyG",
    KeyH: "KeyH",
    KeyI: "KeyI",
    KeyJ: "KeyJ",
    KeyK: "KeyK",
    KeyL: "KeyL",
    KeyM: "KeyM",
    KeyN: "KeyN",
    KeyO: "KeyO",
    KeyP: "KeyP",
    KeyQ: "KeyQ",
    KeyR: "KeyR",
    KeyS: "KeyS",
    KeyT: "KeyT",
    KeyU: "KeyU",
    KeyV: "KeyV",
    KeyW: "KeyW",
    KeyX: "KeyX",
    KeyY: "KeyY",
    KeyZ: "KeyZ",
    MetaLeft: "MetaLeft",
    MetaRight: "MetaRight",
    Minus: "Minus",
    NumLock: "NumLock",
    NumadDecimal: "NumadDecimal",
    Numpad0: "Numpad0",
    Numpad1: "Numpad1",
    Numpad2: "Numpad2",
    Numpad3: "Numpad3",
    Numpad4: "Numpad4",
    Numpad5: "Numpad5",
    Numpad6: "Numpad6",
    Numpad7: "Numpad7",
    Numpad8: "Numpad8",
    Numpad9: "Numpad9",
    NumpadAdd: "NumpadAdd",
    NumpadDivide: "NumpadDivide",
    NumpadMultiply: "NumpadMultiply",
    NumpadSubtract: "NumpadSubtract",
    PageDown: "PageDown",
    PageUp: "PageUp",
    Pause: "Pause",
    Period: "Period",
    PrintScreen: "PrintScreen",
    ScrollLock: "ScrollLock",
    SemiColon: "Semicolon",
    ShiftLeft: "ShiftLeft",
    ShiftRight: "ShiftRight",
    Slash: "Slash",
    Space: "Space",
    Tab: "Tab"
}

class InputHandler {
    #keysDown = {}
    #keyPressed = {}
    #keyReleased = {}

    #mouseButtonsDown = {}
    #mouseButtonPressed = {}
    #mouseButtonReleased = {}

    #mouseButtonID = ["1", "3", "2"]

    keyDown = new EngineEvent();
    keyUp = new EngineEvent();

    mouseDown = new EngineEvent();
    mouseUp = new EngineEvent();
    mouseMove = new EngineEvent();
    mouseWheel = new EngineEvent();

    mouse1Down = new EngineEvent();
    mouse1Up = new EngineEvent();

    mouse2Down = new EngineEvent();
    mouse2Up = new EngineEvent();

    mouse3Down = new EngineEvent();
    mouse3Up = new EngineEvent();

    #mousePos = Vector2.zero();

    #canvas;

    constructor(canvas) {
        for (let keyCode in KeyCode) {
            this.#keysDown[KeyCode[keyCode]] = false;
            this.#keyPressed[KeyCode[keyCode]] = false;
            this.#keyReleased[KeyCode[keyCode]] = false;
        }

        let mouseButtons = 5;
        for (let i = 1; i <= mouseButtons; i++) {
            this.#mouseButtonsDown[i] = false;
            this.#mouseButtonPressed[i] = false;
            this.#mouseButtonReleased[i] = false;
        }

        window.addEventListener("blur", () => {
            for (let keyCode in this.#keysDown) this.#keysDown[keyCode] = false;
            for (let keyCode in this.#keyPressed) this.#keyPressed[keyCode] = false;
            for (let keyCode in this.#keyReleased) this.#keyReleased[keyCode] = false;
        });

        window.addEventListener("keydown", this.#keydown);
        window.addEventListener("keyup", this.#keyup);
        window.addEventListener("mousedown", this.#mousedown);
        window.addEventListener("mouseup", this.#mouseup);
        window.addEventListener("mousemove", this.#mousemove);
        window.addEventListener("wheel", this.#mousewheel);

        this.#canvas = canvas;
    }

    update() {
        for (let keyCode in this.#keyPressed) this.#keyPressed[keyCode] = false;
        for (let keyCode in this.#keyReleased) this.#keyReleased[keyCode] = false;

        for (let mouseButton in this.#mouseButtonPressed) this.#mouseButtonPressed[mouseButton] = false;
        for (let mouseButton in this.#mouseButtonReleased) this.#mouseButtonReleased[mouseButton] = false;
    }

    #keydown = (e) => {
        if (!this.#keysDown[e.code]) this.#keyPressed[e.code] = true;
        this.#keysDown[e.code] = true;
        this.keyDown.trigger(e.code, e.key, e.shiftKey, e.ctrlKey, e.altKey);
    }

    #keyup = (e) => {
        if (this.#keysDown[e.code]) this.#keyReleased[e.code] = true;
        this.#keysDown[e.code] = false;
        this.keyUp.trigger(e.code, e.key, e.shiftKey, e.ctrlKey, e.altKey);
    }

    #mousedown = (e) => {
        let button = this.#mouseButtonID[e.button] || e.button;

        this.mouseDown.trigger(button, this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        
        if (!this.#mouseButtonsDown[button]) this.#mouseButtonPressed[button] = true;
        
        this.#mouseButtonsDown[button] = true;

        if (button === "1") this.mouse1Down.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "2") this.mouse2Down.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "3") this.mouse3Down.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
    }

    #mouseup = (e) => {
        let button = this.#mouseButtonID[e.button];

        this.mouseUp.trigger(button, this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);

        if (this.#mouseButtonsDown[button]) this.#mouseButtonReleased[button] = true;

        this.#mouseButtonsDown[button] = false;

        if (button === "1") this.mouse1Up.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "2") this.mouse2Up.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "3") this.mouse3Up.trigger(this.#mousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
    }

    #mousemove = (e) => {
        let rect = this.#canvas.getBoundingClientRect();
        let scale = 1000 / this.#canvas.width;

        let oldPos = this.#mousePos.copy();

        this.#mousePos = new Vector2((e.clientX - rect.x), (e.clientY - rect.y)).multiplied(scale);
        this.mouseMove.trigger(this.#mousePos.copy(), oldPos, e.shiftKey, e.ctrlKey, e.altKey);
    }

    #mousewheel = (e) => {
        let direction = 0;

        if (e.deltaY > 0) direction = 1;
        else if (e.deltaY < 0) direction = -1; 

        this.mouseWheel.trigger(direction);
    }

    getMousePosition = () => this.#mousePos.copy();
}