class Layer {
    constructor(nodeCount, previousCount, batchSize, activation) {
        this.logits = new Matrix(batchSize, nodeCount);
        this.activations = new Matrix(batchSize, nodeCount);
        this.weights = new Matrix(previousCount, nodeCount);
        this.biases = new Vector(nodeCount);
    }
}