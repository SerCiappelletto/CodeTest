
const fs = require('fs');
// const readline = require('readline');

class Stocks {
        constructor()
        {
                let raw = fs.readFileSync('./data/input.json');
                this.stocks = JSON.parse(raw);
        }
        printStocks(){
                return new Promise((resolve, reject) => {
                        resolve(this.stocks);
                });
        }
        setStock(target, name, price){
                return new Promise((resolve, reject) => {
                        for(let stock of this.stocks){
                                if(stock.name == target){
                                        stock.name = name;
                                        stock.price = price;
                                        let data = JSON.stringify(this.stocks);
                                        fs.writeFileSync('./data/input.json', data);
                                        resolve(JSON.stringify("Stock updated."))
                                }
                        }
                        resolve(JSON.stringify("Stock failed to update."))
                });
        }
        addStock(name, price)
        {
                return new Promise((resolve, reject) => {
                        if(name != undefined && price != undefined && name != null && price != NaN){
                                this.stocks.push({ name: name, price: price });
                                let data = JSON.stringify(this.stocks);
                                fs.writeFileSync('./data/input.json', data);
                                resolve(JSON.stringify("Stock successfully added."));
                        }else{
                                resolve(JSON.stringify("Sorry, we couldn't add the stock."))
                        }
                })
        }
        getStock(stockName)
        {
                return new Promise((resolve, reject) => {
                        for(let stock of this.stocks){
                                if(stock.name == stockName){
                                        resolve(JSON.stringify(stock));
                                }
                        }
                        resolve(JSON.stringify("Sorry, we couldn't find the stock you searched for."));
                })
        }
        humanReadablePrint(stock)
        {
                return new Promise((resolve, reject) => {
                        if(stock !== undefined){
                                resolve( JSON.stringify("The stock you searched (" + stock.name + ") is currently trading at the price of : " + stock.price + " USD."));
                        }else{
                                resolve( JSON.stringify("Sorry, we couldn't find the stock you were searching for."));
                        }
                })
        }
        async humanReadableSearch(stockName)
        {
                return new Promise(async (resolve, reject) => {
                        let stock = await this.getStock(stockName);
                        stock = JSON.parse(stock);
                        if(stock !== null){
                                let data = await this.humanReadablePrint(stock);
                                resolve(data);
                        }else{
                                resolve(JSON.stringify("There are no records of the searched stock."));
                        }
                });
        }
        filterStocks(params)
        {
                return new Promise((resolve, reject) => {
                        let target = params.target;
                        let mode = params.mode;
                        let temp = this.stocks;
                        let returnObject = []

                        temp.sort( function(a, b, mode) {
                                if(mode == 1 || mode == true){
                                        return a.price - b.price;
                                }else{
                                        return b.price - a.price;
                                }
                        })

                        for(let stock of temp){
                                if(mode == 1){
                                        if(stock.price >= target){
                                                returnObject.push({name: stock.name, price: stock.price});
                                        }
                                }else {
                                        if(stock.price <= target){
                                                returnObject.push({name: stock.name, price: stock.price});
                                        }
                                }
                        }

                        resolve(returnObject);
                });
        }
}

exports.default = new Stocks();