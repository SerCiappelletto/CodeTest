
exports.default = class Stocks {
        constructor()
        {
                let raw = fs.readFileSync('./data/input.json');
                this.stocks = JSON.parse(raw);
        }
        printStocks(request, response){
                for(let stock of this.stocks){
                        console.log("   The stock " + stock.name);
                        console.log("is currently traded at the price of : " + stock.price + " USD.\n");
                }
        }
        setStock(target, name, price){
                for(let stock of this.stocks){
                        if(stock.name == target){
                                stock.name = name;
                                stock.price = price;
                                let data = JSON.stringify(this.stocks);
                                fs.writeFileSync('./data/input.json', data);
                                return true;
                        }
                }
                return false;
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
                                return stock;
                        }
                }
        }
        humanReadablePrint(stock)
        {
                if(stock !== undefined){
                        console.log("The stock you searched (" + stock.name + ") is currently trading at the price of : " + stock.price + " USD.");
                }else{
                        console.log("Sorry, we couldn't find the stock you were searching for.");
                }
        }
        humanReadableSearch(stockName)
        {
                let stock = this.getStock(stockName);
                if(stock !== null){
                        this.humanReadablePrint(stock);
                }else{
                        console.log("There are no records of the searched stock.");
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

                console.log("\nThe list ordered after the given conditions is : \n");

                let flag = 0;
                for(let stock of temp){
                        if(mode == 1){
                                if(stock.price >= target){
                                        flag = 1;
                                        console.log("   Name of the stock : " + stock.name + ". " + " Trading at : " + stock.price + " USD.");
                                }
                        }else {
                                if(stock.price <= target){
                                        flag = 1;
                                        console.log("   Name of the stock : " + stock.name + ". " + " Trading at : " + stock.price + " USD.");
                                }
                        }
                }
                if(flag == 0){
                        console.log("   Empty, we couldn't find any stocks that matched the conditions.");
                }
        }
}

        let StockList = ( function() {
                let instance;

                function StockList() {

                        let raw = fs.readFileSync('./data/input.json');
                        let stocks = JSON.parse(raw);

                        return stocks;
                }

                return {
                        getList: function() {
                                if(!instance) {
                                        instance = StockList();
                                }
                                return instance;
                        }
                };
        })();

        UserHandler = async function(handler, instance){
                let flag;
                await new Promise((resolve, reject) => {
                        handler.question("\n\n1) See all available stocks. \n2) Search for a particular stock. \n3) Filter the stocks based on some criteria. \n4) Add new stock entry. \n5) Change stock entry. \n6) Exit the application.\nChoice : ", async function(choice){
                                switch(choice){
                                        case "1":
                                                console.log("\n");
                                                instance.printStocks();
                                                resolve();
                                                break;
                                        case "2":
                                                console.log("\n");
                                                await new Promise((resolve, reject) => {
                                                        handler.question("Type the name of the stock you want to search for : ", (stock) => {
                                                                instance.humanReadablePrint(instance.getStock(stock));
                                                                resolve();
                                                        });
                                                })
                                                resolve();
                                                break;
                                        case "3":
                                                console.log("\n");
                                                await new Promise((resolve, reject) => {
                                                        handler.question("Type the stock price you want to sort by\nand mode of sorting (1 for ascending, 0  for descending) : ", (input) => {
                                                                let params = input.split(" ");
                                                                for(let i = 0; i < params.length; ++i){
                                                                        params[i] = parseInt(params);
                                                                        if(params[i] === NaN){
                                                                                console.log("The answer is not formatted correctly.");
                                                                                resolve();
                                                                        }
                                                                }
                                                                if(params.length != 2 || (params[1] != 1 && params[1] != 0)){
                                                                        console.log("You must type two numbers, the last one being either 1 or 0.");
                                                                        resolve();
                                                                }
                                                                instance.filterStocks(params[0], params[1]);
                                                                resolve();
                                                        });
                                                })
                                                resolve();
                                                break;
                                        case "4":
                                                console.log("\n");
                                                await new Promise((resolve, reject) => {
                                                        handler.question("Type the stock name and the price you would like to add <name price>: ", (input) => {
                                                                let parameters = input.split(" ");
                                                                parameters[1] = parseInt(parameters[1]);
                                                                if(parameters.length != 2){
                                                                        console.log("You need to add two parameters, please try again.");
                                                                        resolve();
                                                                }else if(parameters[1] === NaN ){
                                                                        console.log("The second parameter must be a number, please try again.");
                                                                        resolve();
                                                                }
                                                                instance.addStock(parameters[0], parameters[1]);
                                                                console.log("Entry successfully saved to file.");
                                                                resolve();
                                                        })
                                                })
                                                resolve()
                                                break;
                                        case "5":
                                                console.log("\n");
                                                await new Promise((resolve, reject) => {
                                                        handler.question("Type the target stock, the stock name and the price you would like to change <target name price>: ", (input) => {
                                                                let parameters = input.split(" ");
                                                                parameters[2] = parseInt(parameters[2]);
                                                                if(parameters.length != 3){
                                                                        console.log("You need to add three parameters, please try again.");
                                                                        resolve();
                                                                }else if(parameters[2] === NaN ){
                                                                        console.log("The third parameter must be a number, please try again.");
                                                                        resolve();
                                                                }
                                                                if(instance.setStock(parameters[0], parameters[1], parameters[2])){
                                                                        console.log("Entry successfully saved.");
                                                                }else{
                                                                        console.log("Sorry, we couldn't find the stock you wanted to change.");
                                                                }
                                                                resolve();
                                                        })
                                                })
                                                resolve()
                                                break;
                                        case "6":
                                                console.log("\n");
                                                handler.close();
                                                reject();
                                                break;
                                        default:
                                                console.log("\nOption not recognized, please try again.");
                                                resolve();
                                                break;
                                }
                        })
                }).then(() => {
                        flag = 0;
                }).catch(() => {
                        flag = 1;
                });

                return flag;

        }

        async function run() {
                let instance = StockList.getList();
                const handler = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                })

                console.log("\nWelcome User, what would you like to do ?\nType the number corresponding to the operation you want to be executed.");
                let flag = 0;
                while(flag != 1){
                        flag = await UserHandler(handler, instance);
                }
        }