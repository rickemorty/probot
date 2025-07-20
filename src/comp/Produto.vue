<script setup>
let { e, p } = defineProps(['e', 'p'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, ref } from 'vue'
var { app, chat, send, scroll, update } = inject('shopbot')
var produto = ref({ nome: "", foto: "", desc: "", preco: "", qtd: 1, ativo: true })
if (p) produto.value = p
if(!e) p.qtd=1
var load = ref(false)

</script>

<template lang="pug">
.Produto.in.sh.border.bw(:class="`${app.talk && 'out'} ${!e && 'c pt'}`")
    .n.row.ac(v-if="e")
        i.fa.fa-box
        b Produto
    .campo.col
        label(v-if="e") FOTO
        Foto(v-if="e" :cb="(v)=>produto.foto=v" :e="e")
        img.foto(v-else :src="produto.foto[0].src")
    .campo.col
        label(v-if="e") NOME)
        input(v-if="e" v-model="produto.nome" placeholder="Nome do produto.")
        b.tc(v-else) {{produto.nome}}
    .campo.col(v-if="e")
        label DESCRIÇÃO
        textarea(v-if="e" v-model="produto.desc" placeholder="Descrição.")
        .desc(v-else) {{produto.desc}}
    .campo.col
        label(v-if="e") PREÇO (R$)
        input(v-if="e" v-model="produto.preco" placeholder="0,00")
        .preco.fb.tc(v-else) R$ {{parseFloat(produto.preco).toFixed(2)}}
    .campo.col(v-if="e")
        label QUANTIDADE
        .row.ac
            button.fa.fa-minus
            input(v-model="produto.qtd" type="number" placeholder="Quantidade.")
            button.fa.fa-plus
    .campo.col(v-if="e")
        label ATIVO
        Chave(:t="{on: produto.ativo, cb:()=>produto.ativo=!produto.ativo}")
    button.save.row.ac.jc.fb(v-if="e" @click="app.talk=true;app.input={};send({e:'produto', p:produto})") 
        i.fa.fa-floppy-disk
        | SALVAR
</template>

<style lang="sass" scoped>
$g: #00FF7F

.Produto
    border-radius: 12px
    background: white
    padding: 16px 18px            
    .n
        font-size: 34px
        padding-bottom: 24px
        color: #666
        i
            margin-right: 8px
    .campo
        margin-bottom: 20px
        label
            font-weight: bold
        input,textarea
            margin-top: 1px
            padding: 10px
            border: none
            border-bottom: 2px solid #ccc
            &:focus
                background: rgba($g,.2)
                border-bottom: 1px solid $g
            &:hover
                border-top-right-radius: 10px
                border-bottom-left-radius: 10px
                border-left: 2px solid var(--main)
                border-bottom: 2px solid var(--main) 
    &.c
        width: 222px 
        overflow: hidden
        padding: 0
        margin-bottom: 20px
        border-left: 2px solid #ccc
        border-bottom: 4px solid #ccc
        &:hover
            border-left: 2px solid var(--main)
            border-bottom: 4px solid var(--main) 
        .campo
            margin-bottom: 10px

    .save
        width: 100%
        border: none
        padding: 10px
        border-radius: 6px
        font-size: 15px
        &:hover
            background: $g
        i
            margin-right: 5px
            
</style>