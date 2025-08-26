<script setup>
let { e, z } = defineProps(['e', 'z'])
var cliente = reactive(z)
import { inject, reactive, ref } from 'vue'
var { app, send, chat } = inject('shopbot')
import { cpf, fone } from '../canivet'
import Titulo from '../comp/Titulo.vue'

function fechar() {
  out.value = true
  if (JSON.stringify(cliente) != JSON.stringify(c)) {
    send({ e: "up", ce: cliente })
    chat.value.push({ m: `Atualizando <b>${cliente.nome}</b>...` })
  }
  setTimeout(() => { app.value.input = {}; out.value = false }, 300)
}
var out = ref(false)
function del() {
  if (confirm(`Deseja excluir o cliente ${cliente.nome}?`)) {
    send({ e: 'del', c: cliente })
    chat.value.push({ user: app.value.client, m: `Excluir categoria <b>${cliente.nome}</b>.` })
  }
}
</script>

<template lang="pug">
.Cliente.sh.border.bw(:class="`${out && 'out'}`")
  Titulo(v-if="e" :z="{n:'cliente',del:del}")
  .campo.col
    label NOME
    input(v-if="e" v-model="cliente.nome" placeholder="Nome")
    .nome.fb(v-else) {{cliente.nome}}
  .campo.col
    label CPF
    input(v-if="e" v-model="cliente.cpf" placeholder="CPF")
    .fb(v-else) {{cpf(cliente.cpf)}}
  .campo
    label FONE
    .row
      template(v-for="f,i in cliente.fone")
        input(v-if="e" v-mask="'fone'" v-model="cliente.fone[i]" placeholder="Fone")
        b(v-else) {{fone(f)}}
  .campo.col(v-if="e && cliente.email")
    label E-MAIL
    input(v-model="cliente.email" placeholder="E-mail")
  .campo.col(v-if="e")
    label ENDEREÇO
    textarea(v-for="a,i in cliente.endereco" v-model="cliente.endereco[i]" placeholder="Endereço")
  .campo.row(v-if="e")
    .col
      label CRIADO
      b {{cliente.criado}}
    .col
      label ATUALIZADO
      b {{cliente.atualizado}}
  button.fechar(v-if="e" @click="fechar") 
    i.fa.fa-circle-down
    | FECHAR
</template>

<style lang="sass">
.Cliente
  .campo
    margin-bottom: 12px
  label
    color: var(--main)
</style>