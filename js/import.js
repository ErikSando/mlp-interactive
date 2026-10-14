const HiddenActivations = {
    "none": z => z,
    "leakyrelu": z => z >= 0 ? z : 0.01 * z,
    "relu": z => z >= 0 ? z : 0,
    "sigmoid": z => 1 / (1 + Math.exp(-z)),
    "tanh": z => Math.tanh(z)
}

function importModel(info) {
    let lines = info.split("\n");

    let layer_sizes = lines[0].split(" ");

    for (let i = 0; i < layer_sizes.length; i++) {
        if (!layer_sizes[i]) {
            layer_sizes.splice(i, 1);
            continue;
        }

        layer_sizes[i] = Number(layer_sizes[i]);

        if (isNaN(layer_sizes[i])) {
            console.error("Invalid layer size");
            return;
        }
    }

    if (layer_sizes.length < 2) {
        // return some error thing handled by the caller which displays the error on the html page
        console.error("Insufficient number of layers");
        return;
    }

    let activation_functions = lines[1].split(" ");
    let hidden_activation = activation_functions[0];
    let output_activation = activation_functions[1];

    let loss = lines[2];

    // lines[3] and lines[4] are batch size and learning rate, can be ignored

    let weights = [];
    let biases = [];

    // console.log(lines);

    if (4 + (layer_sizes.length - 1) * 2 >= lines.length) {
        console.error("Missing weights/biases");
        return;
    }

    for (let i = 0; i < layer_sizes.length - 1; i++) {
        console.log(5 + i * 2);
        console.log(5 + i * 2 + 1);

        weights.push(lines[5 + i * 2].split(" "));
        biases.push(lines[5 + i * 2 + 1].split(" "));
    }

    // console.log(layer_sizes);
    // console.log(hidden_activation);
    // console.log(output_activation);
    // console.log(loss);
    // console.log(weights);
    // console.log(biases);

    let layers = [];

    let layer_size = layer_sizes[0];
    let input_layer = new Layer(layer_size, 0, 1, HiddenActivations[hidden_activation]);
    layers.push(input_layer);

    let previous_size = layer_size;

    for (let i = 1; i < layer_sizes.length - 1; i++) {
        let layer_size = layer_sizes[i];
        let layer = new Layer(layer_size, previous_size, 1, HiddenActivations[hidden_activation]);

        console.log("no. weights: " + weights[i - 1].length);
        console.log("no. biases: " + biases[i - 1].length);
        console.log(previous_size * layer_size);

        for (let j = 0; j < previous_size * layer_size; j++) {
            layer.weights.data[j] = Number(weights[i - 1][j]);

            if (isNaN(layer.weights.data[j])) {
                console.log("NaN weight: " + weights[i - 1][j]);
            }
        }

        for (let j = 0; j < layer_size; j++) {
            layer.biases.data[j] = Number(biases[i - 1][j]);

            if (isNaN(layer.biases.data[j])) {
                console.log("NaN bias: " + biases[i - 1][j]);
            }
        }

        layers.push(layer);
        previous_size = layer_size;
    }

    layer_size = layer_sizes[layer_sizes.length - 1];

    let output_layer = new Layer(layer_size, previous_size, 1, output_activation);

    for (let j = 0; j < previous_size * layer_size; j++) {
        output_layer.weights.data[j] = Number(weights[weights.length - 1][j]);
    }

    for (let j = 0; j < layer_size; j++) {
        output_layer.biases.data[j] = Number(biases[biases.length - 1][j]);
    }

    layers.push(output_layer);

    return new MLP(layers, loss);
}