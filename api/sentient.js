/*

        Copyright Void Chicken (2018)

        sentient.js


*/

function NeuralNetwork()
{
    
}

NeuralNetwork.prototype.Node = function(network, layer)
{ 
    this.layer = 0;
    this.bias = 0;
    
    this.inputs = [];
    this.weights = [];

    this.value = 0;

    this.compute = function()
    {
        this.value += this.bias;

        if (this.layer==0) 
            return this.value;

        for (let i = 0; i < this.inputs.length; i++)
        {

        }
    };
};