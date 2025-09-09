<script setup>
let { e, z, r } = defineProps(['e', 'z', 'r'])
import { inject, reactive } from 'vue'
var { app, send, chat, admin } = inject('lilo')
import { fone, dh, cpf } from '../canivet'
import Titulo from './Titulo.vue'
import CPF from './CPF.vue'
import Endereco from './Endereco.vue'
var original = JSON.parse(JSON.stringify(z))
var cliente = reactive(z)
const abrir = () => { if (!e) { app.value.input = { cliente: cliente } } }
function fechar() {
  app.value.ativar()
  if (JSON.stringify(cliente) != JSON.stringify(original)) {
    send({ e: "cliente", m: cliente })
    chat.value.push({ m: `Atualizando <b>${cliente.nome}</b>...` })
  } else setTimeout(admin, 400)
}
function del() {
  if (confirm(`Deseja excluir o cliente ${cliente.nome}?`)) {
    send({ e: 'del', c: cliente })
    chat.value.push({ user: app.value.client, m: `Excluir cliente <b>${cliente.nome}</b>.` })
  }
}
</script>

<template lang="pug">
.Cliente.border.bw(@click="r?false:abrir" :class="`${!e && 'pt'}`")
  Titulo(v-if="e && app.a" :z="{n:'cliente',fechar:!z._id?admin:false}")
  .row.je(v-if="app.a && e" style="padding:5px 22px")
    i.fa.fa-trash.pt(@click="del" title="EXCLUIR")
  .campo.col
    label NOME
    input(v-if="e && !r" v-model="cliente.nome" placeholder="Nome")
    .nome.fb(v-if="!e || r") {{cliente.nome}}
  .campo.col
    label(v-if="!e || r") CPF
    CPF(v-if="e && !r" :z="cliente")
    .fb(v-if="!e || r") {{cliente.cpf}}
  .campo(v-if="cliente.fone.length")
    .row.ac
      label FONE
      button.add.fa.fa-plus(v-if="e && app.a" @click="cliente.fone.unshift('')" title="ADICIONAR ENDEREÇO")
    .row.wp
      .row.ac(v-if="app.a && e" v-for="f,i in cliente.fone" style="margin-right:25px;")
        input(v-mask="'fone'" v-model="cliente.fone[i]" placeholder="Fone" style="width:125px")
        i.fa.fa-trash.pt.hcr.c6(@click="cliente.fone.splice(i,1)" style="margin-left: -25px;")
      b(v-else) {{cliente.fone[0]}}
  .campo.col(v-if="e && cliente.email")
    label E-MAIL
    input(v-model="cliente.email" placeholder="E-mail")
  .campo.row.ac(v-if="(e||r) && app.a" style="margin-bottom:6px")
    label(v-if="e || app.input.apedido") ENDEREÇO
    button.add.fa.fa-plus(v-if="e" @click="cliente.endereco.unshift({ cep: '' })" title="ADICIONAR ENDEREÇO")
  .campo.col(v-if="e && !r" v-for="f,i in cliente.endereco")
    Endereco(:r="r" :z="cliente.endereco[i]" :del="i>0?()=>cliente.endereco.splice(i,1):false")
  .campo.col(v-if="app.input.apedido && r")
    Endereco(:r="r" :z="cliente.endereco[0]")
  
  .campo.row.ja(v-if="app.a && e")
    .col.ac(v-if="cliente.criado")
      label CRIADO
      b {{dh(cliente.criado)}}
    .col.ac(v-if="cliente.atualizado")
      label ATUALIZADO
      b {{dh(cliente.atualizado)}}
  button.fechar(v-if="app.a && e && cliente.cpf && cliente.nome" @click="fechar") 
    i.fa.fa-circle-down
    | FECHAR
</template>

<style lang="sass">
.Cliente      
  .campo
    margin-bottom: 12px
  .add
    margin-left: 6px  
  label
    color: var(--main)
</style>