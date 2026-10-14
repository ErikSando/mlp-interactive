function softmax(activations, outputs) {
    let max = -Infinity;

    for (let i = 0; i < activations.size(); i++) {
        if (activations.data[i] > max) max = activations.data[i];
    }

    let sum = 0;

    for (let i = 0; i < activations.size(); i++) {
        sum += Math.pow(Math.E, activations.data[i] - max);
    }

    for (let i = 0; i < activations.size(); i++) {
        outputs.data = Math.pow(E, activations.data[i] - max) / sum;
    }
}