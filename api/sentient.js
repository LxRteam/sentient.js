/*

        Copyright Void Chicken (2018)

        sentient.js


*/

function NeuralNetwork(layerSizes)
{
    this.layers = [];

    this.activationFunction = function(input)
    {
        return 1/(1+Math.pow(Math.E,-input));
    };

    for (let i = 0; i < layerSizes.length; i++)
    {
        this.layers[i] = [];
        for (let j = 0; j < layerSizes[i]; j++)
        {
            this.layers[i][j] = new NeuralNetwork.Node(this, i);
        }
    }

    this.compute = function(input)
    {
        let output = [];
        for (let i = 0; i < Math.min(this.layers[0].length, input.length); i++)
        {
            this.layers[i].bias = input[i];
        }
        for (let i = 0; i < this.layers[this.layers.length-1].length; i++)
        {
            output[i] = this.layers[this.layers.length-1][i].compute();
        }
        return output;
    };

    this.trainingModule = undefined;

    this.setTrainingModule = function(trainingModule)
    {
        this.trainingModule = trainingModule;
        this.trainingModule.network = this;
    };

    this.train = function()
    {
        if (trainingModule)
            trainingModule.train();
    };
}

NeuralNetwork.Node = function(network, layer)
{
    this.layer = 0;
    this.bias = 0;

    this.weights = [];

    this.value = 0;
    this.weightedSum = 0;
    this.compute = function()
    {
        this.value += this.bias;

        if (this.layer==0) {
            this.value = network.activationFunction(this.value);
            return this.value;
        }

        for (let i = 0; i < network.layers[this.layer-1].length; i++)
        {
            let weight = this.weights[i];
            this.value += network.layers[this.layer-1][i].compute() * weight;
        }
        this.weightedSum = this.value-this.bias;
        this.value = network.activationFunction(this.value);
        return this.value;
    };
};

NeuralNetwork.Modules = [];

NeuralNetwork.TrainingModule = function(init, trainFunction, moduleId)
{
    NeuralNetwork.Modules[moduleId] = this;

    this.network = undefined;

    init();

    this.train = function()
    {
        trainFunction(this.network);
    };
};
