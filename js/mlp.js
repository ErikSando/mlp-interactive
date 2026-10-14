class MLP {
    constructor(layers, loss) {
        this.layers = layers;
        this.loss = loss;

        for (let layer of this.layers) {
            console.log("=== LAYER ===");

            console.log(layer.logits);
            console.log(layer.activations);
            console.log(layer.weights);
            console.log(layer.biases);
            console.log(layer.activation);
        }
    }

    forwardPass(inputs) {
        this.layers[0].activations.data = inputs;

        for (let l = 1; l < this.layers.length; l++) {
            this.#propagate(this.layers[l - 1], this.layers[l]);
        }
    }

    #propagate = (layer1, layer2) => {
        // batch size will be 1 so i can use .size() instead of .rows() or .columns()
        let NaN_indices = "";

        for (let left_index = 0; left_index < layer1.activations.size(); left_index++) {
            if (isNaN(layer1.activations.data[left_index])) NaN_indices += left_index + " ";
        }

        // console.log("NaN indices")
        // console.log(NaN_indices);

        // console.log(layer1.activations.data);

        for (let right_index = 0; right_index < layer2.logits.size(); right_index++) {
            layer2.logits.data[right_index] = layer2.biases.data[right_index];

            if (isNaN(layer2.biases.data[right_index])) {
                console.log("NaN bias at " + right_index);
            }

            for (let left_index = 0; left_index < layer1.activations.size(); left_index++) {
                let weight_index = left_index * layer2.logits.size() + right_index;

                // if (isNaN(layer2.weights.data[weight_index])) {
                //     console.log("Weight NaN at " + weight_index);
                // }

                // if (isNaN(layer1.activations.data[left_index])) {
                //     console.log("Layer 1 activation NaN at " + left_index);
                // }

                layer2.logits.data[right_index] += layer1.activations.data[left_index] * layer2.weights.data[weight_index];
            }

            if (typeof layer2.activation == "function") {
                layer2.activations.data[right_index] = layer2.activation(layer2.logits.data[right_index]);
            }
        }

        if (typeof layer2.activation == "function") return;

        switch (layer2.activation) {
            case "softmax":
                softmax(layer2.logits, layer2.activations);
            break;
        }

        // if (layer2.activation == "softmax") {
        //     softmax(layer2.logits, layer2.activations);
        // }
    }

    getClassification() {
        let outputs = this.layers[this.layers.length - 1].activations.data;
        console.log(this.layers[this.layers.length - 1]);
        console.log(this.layers[this.layers.length - 1].activations);
        console.log(outputs);
        let max = 0;
        let classification = -1;

        for (let c = 0; c < outputs.length; c++) {
            let output = outputs[c];

            if (output > max) {
                max = output;
                classification = c;
            }
        }

        return classification;
    }

    getLoss(label) {
        let outputs = this.layers[this.layers.length - 1].activations.data;

        if (label < 0) {
            console.error("Negative label is not allowed");
            return -1;
        }

        if (label > outputs.length) {
            console.error("Label exceeds the number of output classes");
            return -1;
        }

        let targets = [];

        for (let c = 0; c < outputs.length; c++) {
            targets.push(c == label ? 1 : 0);
        }

        switch (this.loss) {
            case "cce":
                return -Math.log(outputs[label]);
            break;
        }

        return -1;
    }
}