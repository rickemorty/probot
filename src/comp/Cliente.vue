<script setup>
let { e, z } = defineProps(['e', 'z'])
var cliente = reactive(z)
import { inject, reactive, ref } from 'vue'
var { app, send, chat, admin } = inject('shopbot')
import { fone, dh } from '../canivet'
import Titulo from './Titulo.vue'
import CPF from './CPF.vue'
import Endereco from './Endereco.vue'

cliente.fone.map((f, i) => cliente.fone[i] = fone(f))
const abrir = () => { if (!e) { app.value.input = { cliente: cliente } } }
function fechar() {
  app.value.down()
  if (JSON.stringify(cliente) != JSON.stringify(z)) {
    send({ e: "up", ce: cliente })
    chat.value.push({ m: `Atualizando <b>${cliente.nome}</b>...` })
  }
  if (app.value.a) setTimeout(admin, 300)
}
function del() {
  if (confirm(`Deseja excluir o cliente ${cliente.nome}?`)) {
    send({ e: 'del', c: cliente })
    chat.value.push({ user: app.value.client, m: `Excluir categoria <b>${cliente.nome}</b>.` })
  }
}
</script>

<template lang="pug">
.Cliente.border.bw(@click="abrir" :class="`${!e && 'pt'}`")
  Titulo(v-if="e && app.a" :z="{n:'cliente',del:z._id?del:false}")
  .campo.col
    label NOME
    input(v-if="e" v-model="cliente.nome" placeholder="Nome")
    .nome.fb(v-else) {{cliente.nome}}
  .row.wp
    .campo.col.cpf
      CPF(v-if="e" :z="cliente")
      .fb(v-else) {{cliente.cpf}}
    .campo
      label FONE
      .row.wp
        template(v-for="f,i in cliente.fone")
          input(v-if="e" v-mask="'fone'" v-model="cliente.fone[i]" placeholder="Fone")
          b(v-else) {{f}}
  .campo.col(v-if="e && cliente.email")
    label E-MAIL
    input(v-model="cliente.email" placeholder="E-mail")
  .campo.col(v-if="e" v-for="f,i in cliente.endereco")
    Endereco(:z="cliente.endereco[i]")
  .campo.row(v-if="app.a && e")
    .col(v-if="cliente.criado")
      label CRIADO
      b {{dh(cliente.criado)}}
    .col(v-if="cliente.atualizado")
      label ATUALIZADO
      b {{dh(cliente.atualizado)}}
  button.fechar(v-if="app.a && e" @click="fechar") 
    i.fa.fa-circle-down
    | FECHAR
</template>

<style lang="sass">
.Cliente      
  .campo
    margin-bottom: 12px
  label
    color: var(--main)
  .cpf
    width: 120px
</style>