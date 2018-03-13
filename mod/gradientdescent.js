let module = new NeuralNetwork.TrainingModule(
function()
{
  module.targets = [];
  module.learningRate = 0;
},
function(network)
{
  //calculate error
  for (let i = 0; i < network.layers[network.layers.length-1].length; i++)
  {
    let node = network.layers[network.layers.length-1][i];
    let result = node.value;
    let target = module.targets[i];
    node.error = target-result;
  }

  //propogate error
  for (let i = network.layers.length-1; i >= 1; i--)
  {
    for (let j = 0; j < network.layers[i].length; j++)
    {
      for (let k = 0; k < network.layers[i][j].weights.length; k++) {
        network.layers[i-1][k].error = network.layers[i][j].error * network.layers[i][j].weights[k];
        network.layers[i-1][k].weightSum += network.layers[i][j].weights[k];
      }
    }
    for (let j = 0; j < network.layers[i-1].length; j++)
    {
      network.layers[i-1][k].error /= network.layers[i-1][k].weightSum;
    }
  }

  //modify weights and biases using the delta rule

  for (let i = 1; i < network.layers.length; i++)
  {
    for (let j = 0; j < network.layers[i].length; j++)
    {
      let node = network.layers[i][j];
      node.bias -= module.learningRate * node.error;
      //delta rule: learningRate * lossFunction * network.activationFunction(weightedSumOfInputs) * connectionInput
      for (let k = 0; k < network.layers[i][j].weights.length; k++)
      {
        let wNode = network.layers[i-1][k];
        let wSum = 0;

        network.layers[i][j].weights[k] -= module.learningRate * node.error * network.activationFunction(wNode.weightedSum) * wNode.value;
      }
    }
  }

}, "GRADIENT_DESCENT");
