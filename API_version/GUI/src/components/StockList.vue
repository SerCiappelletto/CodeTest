<template>
        <div id="main">
                <div class="gui">
                        <div>The Stock List : </div>
                        <div v-for="stock in stockList" :key="stock.name">
                                <Stock v-bind:name="stock.name" v-bind:price="stock.price"/>
                        </div>
                        <ul class="actions">
                                <li><button v-on:click="refresh()">Refresh</button></li>
                                <li><button v-on:click="wrapper([1,1,1,0], change)">Change Stock</button></li>
                                <li><button v-on:click="wrapper([0,1,1,0], add)">Add Stock</button></li>
                                <li><button v-on:click="wrapper([0,1,0,0], search)">Search</button></li>
                                <li><button v-on:click="wrapper([1,0,0,1], filter)">Filter</button></li>
                        </ul>
                        <div class ="response">
                                {{response}}
                        </div>
                        <li class="inputForms">
                                <form id="form">
                                        <input v-if="targetON" type="text" ref="target" placeholder="Target" v-model="target">
                                        <input v-if="nameON" type="text" ref="name" placeholder="Name" v-model="name">
                                        <input v-if="priceON" type="text" ref="price" placeholder="Price" v-model="price">
                                        <input v-if="modeON" type="text" ref="mode" placeholder="Mode" v-model="mode">
                                        <button v-if="targetON||nameON||priceON" @click.prevent="callback()">Submit</button>
                                </form>
                        </li>
                </div>
        </div>
</template>

<script>
import Stock from './Stock.vue'

const axios = require('axios');

// make cleanup function

export default {
        name: 'StockList',
        components: {
                Stock
        },
        props: {
        },
        data() {
                return {
                        stockList: "",
                        response: "",
                        target: "",
                        name: "",
                        price: "",
                        mode: "",
                        targetON: false,
                        nameON: false,
                        priceON: false,
                        modeON: false,
                        error: "It appears there was an error.",
                        isSubmitted:false,
                        callback: ""
                }
        },
        mounted(){
                        this.refresh();
        },
        methods: {
                cleanup: function() {
                        this.target = "";
                        this.price = "";
                        this.mode = "";
                        this.name = "";
                        this.targetON = false;
                        this.modeON = false;
                        this.priceON = false;
                        this.nameON = false;
                },
                wrapper: function(itemsToToggle, callback) {
                        this.cleanup();
                        if(itemsToToggle[0])
                                this.targetON = true;
                        if(itemsToToggle[1])
                                this.nameON = true;
                        if(itemsToToggle[2])
                                this.priceON = true;
                        if(itemsToToggle[3])
                                this.modeON = true;
                        this.callback = callback;
                },
                refresh: function() {
                        // the effect of this is only visible if someone else updates the API entries. 
                        axios.get('http://localhost:3000/printStocks')
                                .then((response) => {
                                        this.stockList = response.data;
                                });
                        this.cleanup();
                },
                change: function() {
                        this.price = parseInt(this.price);
                        axios.post('http://localhost:3000/setStock', {
                                stock: {
                                        target: this.target,
                                        name: this.name,
                                        price: this.price
                                }
                        }).then((response)=>{
                                this.refresh();
                                this.response = response.data;
                        }).catch(()=>{
                                this.response = this.err;
                        })
                        this.cleanup();
                },
                add: function() {
                        let name = this.name;
                        let price = parseInt(this.price);
                        axios.post('http://localhost:3000/addStock', {
                                stock: {
                                        name: name,
                                        price: price
                                }
                        }).then((response)=>{
                                this.refresh();
                                this.response = response.data;
                        }).catch(()=>{
                                this.response = this.err;
                        })
                        this.cleanup();
                },
                search: function() {
                        axios.post('http://localhost:3000/search', {
                                stock: {
                                        name: this.name
                                }
                        }).then((response) => {
                                this.response = response.data;
                        }).catch(() => {
                                this.response = this.err;
                        })
                        this.cleanup();
                },
                filter: function() {
                        this.target = parseInt(this.target);
                        this.mode = parseInt(this.mode);
                        axios.post('http://localhost:3000/filter', {
                                params : {
                                        target: this.target,
                                        mode: this.mode
                                }
                        }).then((response) => {
                                this.stockList = response.data;
                                this.response = "Here is the stock list ordered after the requirements."
                        }).catch(() => {
                                this.response = this.err;
                        })
                        this.cleanup();
                }
        }
}
</script>

<style scoped>
#main {
        position: absolute;
        height: auto;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        margin: 10px;
}

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
