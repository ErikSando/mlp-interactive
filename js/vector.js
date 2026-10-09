class Vector {
    #size;

    constructor(size) {
        this.#size = size;
        this.data = new Array(this.#size);
    }

    size() {
        return this.#size;
    }
}