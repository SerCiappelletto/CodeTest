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
.item{
        float: left;
}
</style>
