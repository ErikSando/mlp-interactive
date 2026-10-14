function matMul(mat1, mat2) {
    if (mat1.columns() != mat2.rows()) {
        console.error(`Invalid matrix sizes: ${mat1.rows()}x${mat1.columns()} multiplied by ${mat2.rows()} x ${mat2.columns()}`);
        return;
    }

    s1 = mat1.size();
    r1 = mat1.rows();
    c2 = mat2.columns();

    mat3 = new Matrix(mat1.rows(), mat2.columns());

    for (let i = 0; i < r1; i++) {
        for (let j = 0; j < c2; j++) {
            let index = i * c2 + j;

            mat3.data[index];

            for (let k = 0; k < s1; k++) {
                int 
            }
        }
    }

    return mat3;
}

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