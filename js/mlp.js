class MLP {
    constructor(layers) {
        this.layers = layers;
    }

    forwardPass(inputs) {
        this.layers[0].activations.data = inputs;

        for (let l = 1; l < this.layers.length; l++) {
            this.#propagate(this.layers[l - 1], this.layers[l]);
        }
    }

    #propagate = (layer1, layer2) => {
        // batch size will be 1 so i can use .size() instead of .rows() or .columns()
        for (let right_index = 0; right_index < layer2.logits.size(); right_index++) {
            layer2.logits.data[right_index] = layer2.biases.data[right_index];

            for (let left_index = 0; left_index < layer1.activations.size(); left_index++) {
                let weight_index = left_index * layer2.logits.size() + right_index;

                layer2.logits.data[right_index] += layer1.activations.data[left_index] * weights.data[weight_index];
            }

            layer2.activations.data[right_index] = layer2.activation(layer2.logits.data[right_index]);
        }
    }
}