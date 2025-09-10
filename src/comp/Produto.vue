<script setup>
let { e, z } = defineProps(['e', 'z'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import Titulo from './Titulo.vue'
import { inject, reactive } from 'vue'
var { app, send, chat, admin, categorias, oi } = inject('lilo')
send({ e: 'categorias', l: true })
var produto = reactive(z)
if (!app.value.a) {
  let pedido = app.value.pedido.produtos.filter(p => p._id == produto._id)
  if (pedido.length == 0) produto.qtd = 0
  else produto.qtd = pedido[0].qtd

}
const abrir = () => { if (!e) { app.value.input = { produto: produto } } }
function fechar() {
  app.value.ativar()
  if (app.value.a) {
    if (produto.nome) {
      send({ e: 'up', p: produto })
      chat.value.push({ user: app.value.client, m: `Atualize o produto: <b>${produto.nome}.</b>` })
      setTimeout(() => chat.value.push({ m: `Atualizando <b>${produto.nome}</b>...` }), 300)
    } else { admin(); return }
  } else {
    app.value.pedido.produtos = app.value.pedido.produtos.filter(p => p._id != produto._id)
    if (produto.qtd > 0) app.value.pedido.produtos.push(produto)
  }

  oi()
}
function del() {
  if (confirm(`Deseja excluir ${produto.nome}?`)) {
    send({ e: 'del', p: produto })
    chat.value.push({ user: app.value.client, m: `Excluir <b>${produto.nome}</b>.` })
  }
}
</script>

<template lang="pug">
.Produto(@click="abrir" :class="`${e ?'sh': 'fechado pt'}`")
  Titulo(v-if="e" :z="{n:'Produto', del:app.a && produto._id ?del:false,fechar:app.a?admin:oi}")
  .row.je(v-if="app.a && e" style="padding:5px 22px")
    i.fa.fa-trash.pt(@click="del" title="EXCLUIR")
  .campo.col(v-if="e && app.a")
    label CATEGORIA
    select.pt(v-model="produto.categoria")
      option(value="") Nenhuma
      option(v-for="c in categorias" :value="c._id") {{c.nome}}
  .campo.col(:class="e && app.a && 'campo'")
    label(v-if="e && app.a") FOTO
    Foto(v-if="e && app.a" :cb="(v)=>produto.foto=v" :f="produto.foto")
    .foto(v-if="produto.foto && produto.foto.length && !app.a" :style="`background-image: url(${produto.foto[0].src || ''})`")
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
  .campo.col(v-if="e && app.a")
    label PREÇO (R$)
    input(v-mask="'preco'" v-model="produto.preco" placeholder="0,00")
  
  div(:class="`${e ? 'row ac ja': 'col'}`")
    .campo.col.ac(v-if="e || app.pedido.produtos.filter(p=>p._id==produto._id).length" :class="!e && 'ac'")
      label QUANTIDADE
      .row.ac(v-if="e")
        button.fa.fa-minus(@click="produto.qtd-1>-1 && produto.qtd--")
        input.qtd(v-model="produto.qtd" type="number" min="0" placeholder="Quantidade.")
        button.fa.fa-plus(@click="produto.qtd++")
      .qtd.tc.fb(v-if="!e && !app.a") {{produto.qtd}}
    .preco.fb.tc(v-if="!app.a")
      span R$ 
      | {{produto.preco}}
  button.fechar(v-if="e" @click="fechar") SALVAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Produto
  border-radius: 12px
  background: white  
  overflow: hidden       
  animation: lgrow .5s
  .categoria
      margin-top: -2px
      color: #666
      text-transform: uppercase
      font-size: 13px
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
    color: var(--main)
  .fa-minus,.fa-plus
    border: none
    width: 34px
    height: 34px
    border-radius: 100%
</style>