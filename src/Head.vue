<script setup>
import { inject, ref } from 'vue'
var { app, talk, chat, update } = inject('shopbot')
const sacola = () => {
    let n = app.value.pedido.produtos.length
    if (!n) chat.value.push({ m: "Seu pedido não possui <b>nenhum produto.</b>" })
    else update({ m: [`<b>O seu pedido possui:</b>.`, ...app.value.pedido.produtos, 'Concluir o pedido?'], select: [{ e: 'concluir', o: 'Concluir' }, { e: 'oi', o: 'Continuar comprando' }] })
}
</script>

<template lang="pug">
.Head.row.ac(:class="app.talk && 'talk'")
    .avatar(:style="`background-image:url(${app.avatar})`")
    .col.nome.fb
        .cw {{app.nome}}
        .status.cg {{app.talk?'Escrevendo...':'Online'}}
    //i.fullicon.pt.fa-solid.fa-up-right-and-down-left-from-center(title="TELA CHEIA")
    button(v-if="app.pedido.produtos.length" @click="sacola") CONCLUIR
    .sacola.pt.tc.fb(@click="sacola" title="SACOLA") {{app.pedido.produtos.length}}

</template>

<style lang="sass" scoped>
.Head
    padding: 7px 10px
    padding-right: 16px
    box-shadow: 0 0 10px #999
    height: 56px
    background: var(--main)
    &.talk
        background: linear-gradient(-45deg, #8D00FC, #ee7752, #23a6d5, #23d5ab)
        background-size: 400% 400%
        animation: talk 2.8s ease infinite
    .avatar
        border-radius: 100%
        background: #f1f1f1
        overflow: hidden
        border: 1px solid #00FF7F
        width: 52px
        height: 52px
        background-size: cover
        background-position: center
        box-shadow: 0 1px 2px #666 
        &::after
            border-radius: 100%
            background: #00FF7F
            box-shadow: inset 2px #888
            width: 12px
            height: 12px
            position: absolute
            content: ' '
            margin-top: 40px
            margin-left: 41px
            box-shadow: 0 1px 1px #666 
    .nome
        flex: 1
        padding: 0 8px
        margin-top: 4px
        font-size: 19px
        text-shadow: 0 1px 1px #666 
    .status
        font-size: 15px
    .fullicon
        color: rgba(white,.8)
        font-size: 20px
        margin-top: 4px
        margin-right: 12px
        &:hover
            font-size: 22px  
    .sacola
        &:hover
            font-size: 22px
            opacity: 1
    @keyframes talk
        0%
            background-position: 0% 50%
        50%
            background-position: 100% 50%
        100%
            background-position: 0% 50%
</style>
