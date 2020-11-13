<template>
        <ul class="actions">
                <li><button @click="$emit('refresh')">Refresh</button></li>
                <li><button @click="$emit('change')">Change Stock</button></li>
                <li><button @click="$emit('add')">Add Stock</button></li>
                <li><button @click="$emit('search')">Search</button></li>
                <li><button @click="$emit('filter')">Filter</button></li>
        </ul>
</template>

<script>
export default {
        name: 'Actions',
        props: {
                name: String,
                price: Number

        },
        emits: [
                'refresh',
                'change',
                'add',
                'search',
                'filter'

        ],
        methods: {

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
.actions{
        float: left;
}
</style>