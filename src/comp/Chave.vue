<script setup>
//import HelloWorld from '../components/HelloWorld.vue'
let { t } = defineProps(['t'])
</script>

<template lang="pug">
.Chave.col.jc(:class="t.on && 'on', t.c")
    label.cc {{t.n}}
    .range(@click="t.cb")
        .key.row
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Chave
    cursor: pointer
    opacity: .8
    &:hover
        opacity: 1
    label
        text-align: center
        font-size: 14px
    &.on
        .range
            background: var(--main)
            .key
                margin-left: 20px
    .range
        border-radius: 5px
        height: 26px
        width: 42px
        margin-top: 3px
        margin-bottom: 8px
        border: 1px inset #bbb
        background: #aaa
        .key
            margin-top: -1px
            width: 25px
            height: 26px
            background: white
            border-radius: 4px
            border-right: 3px solid #777
            border-bottom: 3px solid #aaa
</style>
