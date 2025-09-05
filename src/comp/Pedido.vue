<script setup>
import { inject } from 'vue'
var { app, send, oi } = inject('lilo')
import Titulo from './Titulo.vue'
import Cliente from './Cliente.vue'
const fechar = () => {
  app.value.ativar()
  send({ e: 'cliente', pagamento: true, m: app.value.pedido });
}
</script>

<template lang="pug">
.Pedido
  Titulo(:z="{n:'pedido',fechar:oi}")
  Cliente(:z="app.pedido" :e="true")  
  button.fechar(v-if="app.pedido.nome && app.pedido.cpf.length && app.pedido.endereco[0].logradouro" @click="fechar")
    i.fa.fa-circle-down
    | CONTINUAR
</template>