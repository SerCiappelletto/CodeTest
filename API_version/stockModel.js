
const fs = require('fs');
const readline = require('readline');

class Stocks {
        constructor()
        {
                let raw = fs.readFileSync('./data/input.json');
                this.stocks = JSON.parse(raw);
        }
        printStocks(){
                return this.stocks;
        }
        setStock(target, name, price){
                for(let stock of this.stocks){
                        if(stock.name == target){
                                stock.name = name;
                                stock.price = price;
                                let data = JSON.stringify(this.stocks);
                                fs.writeFileSync('./data/input.json', data);
                                return JSON.stringify("Stock updated.");
                        }
                }
                return JSON.stringify("Stock failed to update.");
        }
        addStock(name, price)
        {
                this.stocks.push({ name: name, price: price });
                let data = JSON.stringify(this.stocks);
                fs.writeFileSync('./data/input.json', data);
        }
        getStock(stockName)
        {
                for(let stock of this.stocks){
                        if(stock.name == stockName){
                                return JSON.stringify(stock);
                        }
                }
        }
        async humanReadablePrint(stock)
        {
                await new Promise((resolve, reject) => {
                        if(stock !== undefined){
                                resolve( JSON.stringify("The stock you searched (" + stock.name + ") is currently trading at the price of : " + stock.price + " USD."))
                        }else{
                                resolve( JSON.stringify("Sorry, we couldn't find the stock you were searching for."))
                        }
                })
        }
        async humanReadableSearch(stockName)
        {
                let stock = this.getStock(stockName);
                if(stock !== null){
                        return await this.humanReadablePrint(stock);
                }else{
                        return JSON.stringify("There are no records of the searched stock.");
                }
        }
        filterStocks(target, mode)
        {
                let temp = this.stocks;

                temp.sort( function(a, b, mode) {
                        if(mode == 1 || mode == true){
                                return a.price - b.price;
                        }else{
                                return b.price - a.price;
                        }
                } )

                returnObject.push("\nThe list ordered after the given conditions is : \n");

                let flag = 0;
                let returnObject = [];
                for(let stock of temp){
                        if(mode == 1){
                                if(stock.price >= target){
                                        flag = 1;
                                        returnObject.push("   Name of the stock : " + stock.name + ". " + " Trading at : " + stock.price + " USD.");
                                }
                        }else {
                                if(stock.price <= target){
                                        flag = 1;
                                        returnObject.push("   Name of the stock : " + stock.name + ". " + " Trading at : " + stock.price + " USD.");
                                }
                        }
                }
                if(flag == 0){
                        returnObject.push("   Empty, we couldn't find any stocks that matched the conditions.");
                }

                return JSON.stringify(returnObject);
        }
}

exports.default = new Stocks();