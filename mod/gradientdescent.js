let module = new NeuralNetwork.TrainingModule(
function()
{
  module.targets = [];
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
  
}, "GRADIENT_DESCENT");
