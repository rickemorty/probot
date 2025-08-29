<script setup>
import Titulo from './Titulo.vue'
import Cliente from './Cliente.vue'
</script>

<template lang="pug">
.Pedido.input.border.bw
  Titulo(:z="{n:'pedido',fechar:oi}")
  Cliente(:z="app.pedido")  
  button.fechar(v-if="!icpf && app.pedido.nome && app.pedido.cpf && app.pedido.cpf.length && app.pedido.logradouro" @click="send({e:'cliente', m:app.pedido})")
    i.fa.fa-circle-down
    | CONTINUAR
</template>