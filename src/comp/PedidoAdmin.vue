<script setup>
import { inject } from 'vue'
var { app, send, admin } = inject('lilo')
let { e, z } = defineProps(['e', 'z'])
import Titulo from './Titulo.vue'
import Cliente from './Cliente.vue'
import { dh, real } from '../canivet.js'
const abrir = () => { if (!e) { app.value.input = { apedido: z } } }
const fechar = () => {
  app.value.ativar()
  send({ e: 'cliente', pagamento: true, m: app.value.pedido });
}
</script>

<template lang="pug">
.PedidoAdmin(@click="abrir" :style="!e && 'margin-right:8px;cursor:pointer'")
  Titulo(v-if="e" :z="{n:'pedido',fechar:admin}")
  .campo.col(v-if="e" style="margin-bottom: 12px")
    label.tu Status
    select(v-model="z.status")
      option(value="novo") Novo
      option(value="entregue") Entregue
  .campo.col(style="margin-bottom: 12px")
    label.tu Dia
    b.ca(style="font-size: 20px") {{dh(z.dia)}}
  .campo.col(style="font-size: 22px")
    label Total (R$)
    b.cg {{real(z.total)}}
  .campo.col
    label Pedido
    p.row
      label Produto
      label Preço
      label Quantidade

    p.row.ac(v-for="p,i in z.produtos")
      img(:src="p.foto[0].src" style="width: 60px")
      .col 
        b {{p.nome}}
        span {{p.categoria.nome}}
      b {{p.preco}}
      b x{{p.qtd}}
  Cliente(:z="z.cliente" :r="true")
</template>

<style lang="sass">
.PedidoAdmin
  label
    color: var(--main)
</style>