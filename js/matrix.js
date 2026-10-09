class Matrix {
    #rows;
    #columns;
    #size;

    constructor(rows, columns) {
        this.#rows = rows;
        this.#columns = columns;
        this.#size = rows * columns;
        this.data = new Array(this.#size);
    }

    rows() {
        return this.#rows;
    }

    columns() {
        return this.#columns;
    }

    size() {
        return this.#size;
    }
}