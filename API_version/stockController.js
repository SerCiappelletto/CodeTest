const Stocks = require('./stockModel').default;

exports.printStocks = function(request, response){
        response.send(Stocks);
}

exports.humanReadableSearch = async function(request, response){
        let s = request.params.stock;
        if(s === undefined){
                response.send(JSON.stringify("Bad request"));
        }
        let data = await Stocks.humanReadableSearch(s);
        response.send(data);
}

exports.filterStocks = async function(request, response){
        let s = request.params.stock;
        if (s !== undefined && s.target !== undefined && s.mode !== undefined){
                let data = Stocks.filterStocks(s);
                response.send(data);
        }
        response.send(JSON.stringify("Bad request"));
}

exports.setStock = async function(request, response){
        let s = request.params.stock;

        if (s !== undefined && s.target !== undefined && s.name !== undefined && s.price !== undefined){
                let data = Stocks.setStock(s.target, s.name, s.price);
                response.send(data);
        }

        response.send(JSON.stringify("Bad request"));
}

exports.addStock = function(request, response){
        let s = request.params.stock;

        if (s !== undefined && s.name !== undefined && s.price !== undefined){
                let data = Stocks.addStock(s.name, s.price)
                response.send(data);
        }

        response.send(JSON.stringify("Bad request"));
}

exports.getStock = function(request, response){
        let s = request.params.stock;

        if (s !== undefined && s.name !== undefined){
                let data = Stocks.getStock(s.name)
                response.send(data);
        }

        response.send(JSON.stringify("Bad request"));
}