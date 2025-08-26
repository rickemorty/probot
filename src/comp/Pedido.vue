<script setup>
import { inject, ref } from 'vue'
var { app, chat, send } = inject('shopbot')
var nocep = ref(false)
var icpf = ref(false)

async function cep() {
  let cep = app.value.pedido.cep.replace(/\D/g, '');
  if (cep.length == 8) {
    app.value.pedido.logradouro = ""
    app.value.pedido.cidade = ""
    app.value.pedido.bairro = ""
    app.value.pedido.uf = ""
    nocep.value = false
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (data.erro) {
        nocep.value = true
        chat.value.push({ m: '<b class="cr">CEP não encontrado.</b>' });
        return
      }
      app.value.pedido.logradouro = data.logradouro
      app.value.pedido.cidade = data.localidade
      app.value.pedido.bairro = data.bairro
      app.value.pedido.uf = data.uf
    } catch (e) {
      chat.value.push({ m: '<b class="cr">Erro ao consultar o CEP. Tente novamente.</b>' });
      console.error(e);
    }
  }
}

function invalida() {
  chat.value.push({ m: '<b class="cr">CPF inválido.</b>' });
  icpf.value = true;
}

function valida() {
  icpf.value = false;
  if (app.value.pedido.cpf.length == 14) {
    let cpf = app.value.pedido.cpf.replace(/\D/g, '');

    if (/^(\d)\1+$/.test(cpf)) return invalida()
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return invalida()
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i); -0
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return invalida()
  }
}
</script>

<template lang="pug">
.Pedido.input.border.bw
  .campo.col
    label NOME
    input(v-model="app.pedido.nome" placeholder="Nome Completo")
  .row
    .campo.col(style="width:40%")
      label CPF
      input(v-model="app.pedido.cpf" @input="valida" v-mask="'cpf'" placeholder="CPF")
      b.cr(v-if="icpf" style="margin: 6px 12px;font-size:13px") CPF INVÁLIDO
    .campo.col(style="width:40%")
      label FONE
      input(v-model="app.pedido.fone" v-mask="'fone'" placeholder="Whatsapp")
  .campo.col
    .row.ac
      .col
        label CEP
        input(v-model="app.pedido.cep" v-mask="'cep'" @input="cep()" placeholder="CEP" style="width:170px")
      .cep.fb.cr(v-if="nocep") CEP não encontrado.
  .campo.col(v-if="app.pedido.logradouro" style="margin-top:-4px")
    label.cp ENDEREÇO
    b {{app.pedido.logradouro}} - {{app.pedido.bairro}} - {{app.pedido.cidade}}/{{app.pedido.uf}}
    .row.fb(style="margin-top:10px")
      .col(style="width:30%")
        label.cp NÚMERO
        input(type="number" v-model="app.pedido.n" placeholder="N°")
      .col(style="width:70%")
        label.cp COMPLEMENTO
        input(v-model="app.pedido.comp" placeholder="Complemento")
  button.fechar(v-if="!icpf && app.pedido.nome && app.pedido.cpf && app.pedido.cpf.length && app.pedido.logradouro" @click="send({e:'cliente', m:app.pedido})")
    i.fa.fa-circle-down
    | CONTINUAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Pedido
  input
    font-size: 16px
    font-weight: bold
  .cep
    margin-left: 6px
    margin-bottom: -20px
</style>