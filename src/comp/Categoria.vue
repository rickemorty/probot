<script setup>
let { e, c } = defineProps(['e', 'c'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, scroll } = inject('shopbot')
var categoria = reactive({ nome: "", foto: [], desc: "", ativo: true })
if (c) categoria = c
if (!app.value.a && app.value.pedido.produtos.filter(p => p._id == categoria._id).length == 0) categoria.qtd = 0
const abrir = () => { if (!e) { app.value.input.categoria = categoria } }
function fechar() {
    if(categoria.nome) send({ e: "novo", c: categoria })
    app.value.input = { cb: app.value.input.cb };
    scroll(500)
}

</script>

<template lang="pug">
.Categoria.sh.border.bw(@click="abrir" :class="`${app.talk && e && 'out'} ${!e && 'fechado pt'}`")
    .tipo.row.ac(v-if="e && app.a")
        i.fa.fa-layer-group
        b Categoria
    .campo.col
        label(v-if="e && app.a") FOTO
        Foto(v-if="e && app.a" :cb="(v)=>categoria.foto=v" :e="e")
        img.foto(v-else :src="categoria.foto[0].src || ''")
    .campo.col
        label(v-if="e && app.a") NOME
        input(v-if="e && app.a" v-model="categoria.nome" placeholder="Nome da categoria.")
        .nome.fb.tc(v-else) {{categoria.nome}}
    .campo.col(v-if="e")
        label(v-if="e && app.a") DESCRIÇÃO
        textarea(v-if="e && app.a" v-model="categoria.desc" placeholder="Descrição.")
        .desc.tc(v-else) {{categoria.desc}}
    .campo.col(v-if="e && app.a")
        label ATIVO
        Chave(:t="{on: categoria.ativo, cb:()=>categoria.ativo=!categoria.ativo}")
    button.fechar(v-if="e && app.a" @click="fechar") 
        i.fa.fa-circle-down
        | FECHAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Categoria
    border-radius: 12px
    background: white  
    overflow: hidden       
    animation: lgrow .5s
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
    input[type="number"]:hover
        border-bottom: 1px solid $g
    .nome
        font-size: 22px
        margin-bottom: 4px
    .preco
        color: $g
        font-size: 26px
        padding-bottom: 12px
        margin-top: 5px
        span
            font-size: 13px
    .qtd
        width: 50px
    .fa-minus,.fa-plus
        border: none
        width: 34px
        height: 34px
        border-radius: 100%
    &.fechado
        width: 222px 
        overflow: hidden
        padding: 0
        padding-bottom: 10px
        margin-bottom: 10px
        /* border-left: 2px solid #ccc */
        border-bottom: 4px solid #ccc
        &:hover
            border-left: 2px solid var(--main)
            border-bottom: 4px solid var(--main) 
        .campo
            margin-bottom: 6px        
        .nome
            font-size: 20px 
        .preco, qtd
            font-size: 22px 
    .save, .fechar
        font-weight: bold
        width: 100%
        border: none
        padding: 15px 10px
        font-size: 15px
        margin-top: 10px
        i
            margin-right: 5px
    .save
        border-bottom: 1px solid #ccc
</style>