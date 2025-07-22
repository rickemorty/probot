<script setup>
let { e, p } = defineProps(['e', 'p'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, chat, scroll, categorias } = inject('shopbot')
var produto = reactive({ categoria: "", nome: "", foto: [], desc: "", preco: "", qtd: 1, ativo: true })
if (p) produto = p
if (!app.value.a && app.value.pedido.produtos.filter(p => p._id == produto._id).length == 0) produto.qtd = 0
const abrir = () => {
    if (app.a) send({ e: 'categorias' })
    if (!e) { app.value.input.produto = produto }
}
function fechar() {
    if (app.value.a) {
        app.value.input = {};
        if (produto.preco)
            send({ e: 'novo', p: produto })
    } else {
        app.value.pedido.produtos = app.value.pedido.produtos.filter(p => p._id != produto._id)
        if (produto.qtd > 0) {
            app.value.pedido.produtos.push(produto)
            chat.value.push({ m: '<b>Pedido atualizado.</b>' })
        }
        app.value.input = { cb: app.value.input.cb };
    }
    scroll(500)
}

</script>

<template lang="pug">
.Produto.sh.border.bw(@click="abrir" :class="`${app.talk && e && 'out'} ${!e && 'fechado pt'}`")
    .tipo.row.ac(v-if="e && app.a")
        i.fa.fa-box
        b Produto
    .campo.col
        label(v-if="e && app.a") CATEGORIA
        select(v-if="e && app.a" v-model="produto.categoria")
            option(value="") NENHUMA
            option(v-for="c in categorias" :value="c._id") {{c.nome}} 
        img.foto(v-else :src="produto.foto[0].src || ''")
    .campo.col
        label(v-if="e && app.a") FOTO
        Foto(v-if="e && app.a" :cb="(v)=>produto.foto=v" :e="e")
        img.foto(v-else :src="produto.foto[0].src || ''")
    .campo.col
        label(v-if="e && app.a") NOME
        input(v-if="e && app.a" v-model="produto.nome" placeholder="Nome do produto.")
        .nome.fb.tc(v-else) {{produto.nome}}
    .campo.col(v-if="e")
        label(v-if="e && app.a") DESCRIÇÃO
        textarea(v-if="e && app.a" v-model="produto.desc" placeholder="Descrição.")
        .desc.tc(v-else) {{produto.desc}}
    .campo.col(v-if="app.a")
        label(v-if="e && app.a") PREÇO (R$)
        input(v-if="e && app.a" v-model="produto.preco" placeholder="0,00")
    .row.ac(:class="!app.a && 'ja'")
        .campo.col(v-if="e || app.pedido.produtos.filter(p=>p._id==produto._id).length" :class="!e && 'ac'")
            label QUANTIDADE
            .row.ac(v-if="e")
                button.fa.fa-minus(@click="produto.qtd-1>-1 && produto.qtd--")
                input.qtd(v-model="produto.qtd" type="number" min="0" placeholder="Quantidade.")
                button.fa.fa-plus(@click="produto.qtd++")
            .qtd.tc.fb(v-if="!e") {{produto.qtd}}
        .preco.fb.tc(v-if="!app.a")
            span R$ 
            | {{parseFloat(produto.preco).toFixed(2)}}
    .campo.col(v-if="e && app.a")
        label ATIVO
        Chave(:t="{on: produto.ativo, cb:()=>produto.ativo=!produto.ativo}")
    button.fechar(v-if="e" @click="fechar") 
        i.fa.fa-circle-down
        | FECHAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Produto
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