<script setup>
let { e, c } = defineProps(['e', 'c'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, chat } = inject('lilo')
var categoria = reactive(c)

function fechar() {
  out.value = true
  if (JSON.stringify(categoria) != JSON.stringify(c)) {
    send({ e: "up", c: categoria })
    chat.value.push({ m: `Atualizando <b>${categoria.nome}</b>...` })
  }
  setTimeout(() => { app.value.input = {}; out.value = false }, 300)
}
var out = ref(false)
function del() {
  if (confirm(`Deseja excluir a categoria ${categoria.nome}?`)) {
    send({ e: 'del', c: categoria })
    chat.value.push({ user: app.value.client, m: `Excluir categoria <b>${categoria.nome}</b>.` })
  }
}
</script>

<template lang="pug">
.Categoria(:class="`${out && 'out'}`")
  .tipo.row.js.ac(v-if="e") Categoria
    i.fa.fa-trash.pt(v-if="categoria._id" @click="del" title="EXCLUIR")
  .campo.col
    label(v-if="e") FOTO
    Foto(v-if="e" :cb="(v)=>categoria.foto=v" :f="categoria.foto")
    img.foto(v-if="!e && categoria.foto.length" :src="categoria.foto[0].src || ''")
  .campo.col
    label(v-if="e") NOME
    input(v-if="e" v-model="categoria.nome" placeholder="Nome da categoria.")
    .nome.fb.tc(v-else) {{categoria.nome}}
  .campo.col(v-if="e")
    label(v-if="e") DESCRIÇÃO
    textarea(v-if="e" v-model="categoria.desc" placeholder="Descrição.")
    .desc.tc(v-else) {{categoria.desc}}
  .campo.col(v-if="e")
    label ATIVO
    Chave(:t="{on: categoria.ativo, cb:()=>categoria.ativo=!categoria.ativo}")
  button.fechar(v-if="e" @click="fechar") 
    i.fa.fa-circle-down
    | FECHAR
</template>
