<template>
        <div class="list" >
                <div class="gui">
                        <div>The Stock List : </div>
                        <div v-for="stock in stockList" :key="stock.name">
                                <Stock v-bind:name="stock.name" v-bind:price="stock.price"/>
                        </div>
                        <Actions @refresh="refresh()" @change="change()"/>
                </div>
        </div>
</template>

<script>
import Stock from './Stock.vue'
import Actions from './Actions.vue'

const axios = require('axios');

// axios.get('/user', {
//         params:{
//                 ID: 1234
//         }
// })

export default {
        name: 'StockList',
        components: {
                Stock,
                Actions
        },
        props: {
        },
        data() {
                return {
                        stockList: ""
                }
        },
        mounted(){
                        axios.get('http://localhost:3000/printStocks')
                                .then((response) => {
                                        this.stockList = response.data.stocks;
                                });
        },
        methods: {
                refresh: function(){
                        console.log("refreshed");
                        axios.get('http://localhost:3000/printStocks')
                                .then((response) => {
                                        this.stockList = response.data.stocks;
                                });
                },
                change: function(){
                        axios.get('http://localhost:3000/getStock', {
                                params: {
                                        
                                }
                        })
                }
        }
}
</script>

<style scoped>
h3 {
        margin: 40px 0 0;
}
ul {
        list-style-type: none;
        padding: 0;
}
li {
        display: inline-block;
        margin: 0 10px;
}
a {
        color: #42b983;
}
.gui{
        float: left;
}
.list {
        float: left;
}
.actions {
        float: right;
}
</style>
