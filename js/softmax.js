function softmax(logits, activations) {
    let max = -Infinity;

    for (let i = 0; i < logits.size(); i++) {
        if (logits.data[i] > max) max = logits.data[i];
    }

    let sum = 0;

    for (let i = 0; i < logits.size(); i++) {
        sum += Math.pow(Math.E, logits.data[i] - max);
    }

    for (let i = 0; i < logits.size(); i++) {
        activations.data[i] = Math.pow(Math.E, logits.data[i] - max) / sum;
    }
}