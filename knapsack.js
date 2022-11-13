const knapsack = (weights, values, capacity) => {
  const matrix = weights.map(() => []);

  for (let i = 0; i < weights.length; i++) {
    for (let k = 0; k <= capacity; k++) {
      if (weights[i] > k) {
        matrix[i - 1] ? (matrix[i][k] = matrix[i - 1][k]) : (matrix[i][k] = 0);
      } else if (matrix[i - 1]) {
        const curr = values[i] + matrix[i - 1][k - weights[i]];
        const prev = matrix[i - 1][k];
        matrix[i][k] = curr > prev ? curr : prev;
      } else {
        matrix[i][k] = values[i];
      }
    }
  }

  const items = [];
  let len = capacity;
  for (let i = matrix.length - 1; i > -1; i--) {
    if (matrix[i - 1]) {
      if (matrix[i][len] === values[i] + matrix[i - 1][len - weights[i]]) {
        items.push({ weight: weights[i], value: values[i] });
        len -= weights[i];
      }
    }
  }

  items.push({ capacity: capacity });

  return items;
};

const weights1 = [1, 3, 4, 5];
const values1 = [1, 4, 5, 7];
const capacity1 = 7;

const weights2 = [5, 3, 4, 2];
const values2 = [60, 50, 70, 30];
const capacity2 = 5;

console.log(knapsack(weights1, values1, capacity1));
console.log(knapsack(weights2, values2, capacity2));
