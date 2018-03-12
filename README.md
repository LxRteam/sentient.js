# sentient.js

A modular neural network library made in Javascript.


## Basics

### Creating a network object

A nueral network object can be made like this.

```javascript
let network = new NeuralNetwork([3, 4, 2]);
```

The parameters of the constructor state the layer sizes in a neural network. The code above would make the neural network shown below.

![Neural Network Image](https://upload.wikimedia.org/wikipedia/commons/4/46/Colored_neural_network.svg)

By Glosser.ca [CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons

### Running the network

The network run using the ``compute`` function. It takes an array for the inputs and returns an array for the output.

```javascript
let output = network.compute(input);
```

## Training

Training modules are custom made modules that train the network. Instead of modules being built into the library, they are made by users, so it can be used in multiple situations with different training algorithms. 

To make a training module, call the Training Module constructor like the following.

```javascript
new NeuralNetwork.TrainingModule(init, trainFunction, moduleId);
```

The ``init`` parameter is a function that is called when the training module is initialized, and the ``trainFunction parameter`` is the function that is called when ``NeuralNetwork.train`` is called.

The ``init`` function should have no parameters, and the ``trainFunction`` function should have the parameter ``network``.

``network`` is the NeuralNetwork object.

The ``moduleId`` is an optional parameter to let the module be accessed by its id. Must be set in libraries.

Example of a module object:

```javascript

function train()
{

}

function init()
{

}

let module = new NeuralNetwork.TrainingModule(init, train, "trainingModuleExample");

```

### Applying to a network

To use a training module on a neural network, you call this function:

```javascript
network.setTrainingModule(module);
```

To train:

```javascript
network.train();
```

### Getting modules added by libraries

To get modules made by libraries, you need to know the module id of the modules introduced. Once you know them, the following code will retrive it:

```javascript
let module = NeuralNetwork.Modules[moduleId];
```


