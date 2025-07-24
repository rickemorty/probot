<script setup>
let { e, c } = defineProps(['e', 'c'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, scroll, chat, admin } = inject('shopbot')
var categoria = ref(c)
if (!app.value.a && app.value.pedido.produtos.filter(p => p._id == categoria.value._id).length == 0) categoria.value.qtd = 0

function fechar() {
  out.value = true
  if (categoria.value._id || (categoria.value.nome.length)) {
    send({ e: "up", c: categoria.value })
    chat.value.push({ user: app.value.client, m: `Cadastre a categoria: <b>${categoria.value.nome}.</b>` })
    setTimeout(() => { app.value.input = {}; out.value = false }, 300)
    setTimeout(() => chat.value.push({ m: `Cadastrando ${categoria.value.nome}...` }), 300)
  }
  setTimeout(() => (admin(), out.value = false), 300)
  scroll(500)
}
var out = ref(false)
function del() {
  if (confirm(`Deseja excluir a categoria ${categoria.value.nome}?`)) {
    send({ e: 'del', c: categoria.value, _id: categoria.value._id })
    chat.value.push({ user: app.value.client, m: `Excluir categoria ${categoria.value.nome}.` })
    setTimeout(() => chat.value.push({ m: `Excluindo categoria ${categoria.value.nome}...` }), 300)
    setTimeout(() => (admin(), out.value = false), 500)
  }
}
</script>

<template lang="pug">
.Categoria.input.sh.border.bw(:class="`${out && 'out'}`")
  .tipo.row.js(v-if="e && app.a") Categoria
    i.fa.fa-trash.pt(v-if="categoria._id" @click="del" title="EXCLUIR")
  .campo.col
    label(v-if="e && app.a") FOTO
    Foto(v-if="e && app.a" :cb="(v)=>categoria.foto=v" :f="categoria.foto")
    img.foto(v-if="!e && !app.a && categoria.foto.length" :src="categoria.foto[0].src || ''")
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
