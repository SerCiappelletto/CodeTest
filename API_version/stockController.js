const Stocks = require('./stockModel').default;

exports.printStocks = async function(request, response){
        let data = await Stocks.printStocks();
        response.send(data);
}

exports.setStock = async function(request, response){
        let s = request.body.stock;
        let data = await Stocks.setStock(s.target, s.name, s.price);
        response.send(data);
}

exports.humanReadableSearch = async function(request, response){
        let s = request.body.stock;
        let data = await Stocks.humanReadableSearch(s.name);
        response.send(data);
}

exports.filterStocks = async function(request, response){
        let s = request.body.params;
        let data = await Stocks.filterStocks(s);
        response.send(data);
}

exports.addStock = async function(request, response){
        let s = request.body.stock;
        let data = await Stocks.addStock(s.name, s.price);
        response.send(data);
}

exports.getStock = function(request, response){
        let s = request.body.stock;
        let data = Stocks.getStock(s.name)
        response.send(data);
}