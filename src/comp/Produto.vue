<script setup>
let { e, p } = defineProps(['e', 'p'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, chat, scroll, categorias } = inject('shopbot')
var produto = reactive({})
if (p) produto = p
if (!app.value.a && app.value.pedido.produtos.filter(p => p._id == produto._id).length == 0) produto.qtd = 0
const abrir = () => { if (!e) { app.value.input.produto = produto } }
function fechar() {
  out.value = true
  if (app.value.a) {
    if (produto.nome) {
      send({ e: 'novo', p: produto })
      chat.value.push({ user: app.value.client, m: `Cadastrar o produto: <b>${produto.nome}.</b>` })
      setTimeout(() => chat.value.push({ m: `Cadastrando ${produto.nome}...` }), 300)
    } else app.value.input.select = [{ e: 'pc', o: "Novo Produto/Categoria" }, { e: 'categorias', o: 'Editar Produtos' }]
  } else {
    app.value.pedido.produtos = app.value.pedido.produtos.filter(p => p._id != produto._id)
    if (produto.qtd > 0) {
      app.value.pedido.produtos.push(produto)
      chat.value.push({ m: '<b>Para finalizar o pedido clique no icone:</b> <div class="sacola" style="background-color: var(--main);width: 25px;height: 20px;padding: 6px 6px"></div>' })
    }
  }
  setTimeout(() => { app.value.input = {}; out.value = false }, 300)
  scroll(500)

}
var out = ref(false)

</script>

<template lang="pug">
.Produto.input.border.bw(@click="abrir" :class="`${out && 'out'} ${e ?'sh': 'fechado pt'}`")
  .tipo(v-if="e && app.a") Produto
  .campo.col(v-if="e && app.a")
    label CATEGORIA
    select.pt(v-if="e && app.a" v-model="produto.categoria")
      option(value="") Nenhuma
      option(v-for="c in categorias" :value="c._id") {{c.nome}}
  .col(:class="e && app.a && 'campo'")
    label(v-if="e && app.a") FOTO
    Foto(v-if="e && app.a" :cb="(v)=>produto.foto=v" :f="produto.foto")
    .foto(v-if="!e && !app.a && produto.foto.length" :style="`background-image: url(${produto.foto[0].src || ''})`")
  .campo.col
    label(v-if="e && app.a") NOME
    input(v-if="e && app.a" v-model="produto.nome" placeholder="Nome do produto.")
    template(v-else)
      .nome.fb.tc {{produto.nome}}
      .categoria.tc {{produto.categoria.nome}}
  .campo.col(v-if="e")
    label(v-if="e && app.a") DESCRIÇÃO
    textarea(v-if="e && app.a" v-model="produto.desc" placeholder="Descrição.")
    .desc.tc(v-else) {{produto.desc}}
  .campo.col(v-if="app.a")
    label(v-if="e && app.a") PREÇO (R$)
    input(v-if="e && app.a" v-model="produto.preco" placeholder="0,00")
  div(:class="`${!app.a && e ? 'row ac ja': '.col'} `")
    .campo.col.ac(v-if="e || app.pedido.produtos.filter(p=>p._id==produto._id).length" :class="!e && 'ac'")
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
  .categoria
      margin-top: -4px
  .preco
    color: $g
    font-size: 26px
    padding-bottom: 12px
    margin-top: 5px
    margin-right: 12px
    span
      font-size: 13px
  .qtd
    width: 70px
  .fa-minus,.fa-plus
    border: none
    width: 34px
    height: 34px
    border-radius: 100%
</style>