<template>
        <ul class="stock">
                <li class="item">
                        <b>{{name}}</b> <i>currently traded at :</i> <b>{{price}}</b>
                </li>
        </ul>
</template>

<script>
export default {
        name: 'Stock',
        props: {
                name: String,
                price: Number

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

.item{
        float: left;
}
</style>
