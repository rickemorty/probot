<script setup>
import { inject } from 'vue'
var { app, pagamento } = inject('shopbot')
</script>

<template lang="pug">
.Cartao.input.border.bw
  .tipo.row.js.ac CARTÃO DE CRÉDITO
    i.fa.fa-times.pt(@click="app.input={txt:true}" title="FECHAR")
  .campo.col
    label NOME 
    input(v-model="app.pedido.cartao.nome" placeholder="Igual ao do cartão.")
  .campo.col
    label NÚMERO
    input(v-model="app.pedido.cartao.n" v-mask="'cartao'" placeholder="Número do cartão.")
  .campo.row.js
    .col
      label VALIDADE (MÊS/ANO)
      .row.js(style="width: 140px")
          input(v-model="app.pedido.cartao.mes" style="width: 70px"  maxlength="2" type="number" min="1" max="12" placeholder="MM")
          input(v-model="app.pedido.cartao.ano" style="width: 70px"  maxlength="2" type="number" min="1" max="2" placeholder="AA")
    .col(style="width: 120px")
      label CCV
      input(v-model="app.pedido.cartao.ccv" type="number" maxlength="3" placeholder="000")
  button.fechar(v-if="app.pedido.cartao.n && app.pedido.cartao.nome && app.pedido.cartao.ccv && app.pedido.cartao.mes && app.pedido.cartao.ano" @click="app.pedido.forma='cartao';pagamento()")
    i.fa.fa-circle-down
    | CONTINUAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Cartao
  input
    font-size: 16px
    font-weight: bold
</style>