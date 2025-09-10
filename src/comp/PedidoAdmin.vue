<script setup>
import { inject } from 'vue'
var { app, send, admin } = inject('lilo')
let { e, z } = defineProps(['e', 'z'])
import Titulo from './Titulo.vue'
import Cliente from './Cliente.vue'
import { dh, real } from '../canivet.js'
const abrir = () => { if (!e) { app.value.input = { apedido: z } } }
const salvar = () => {
  send({ e: 'status', m: { _id: z._id, status: z.status } });
  app.value.ativar()
}
</script>

<template lang="pug">
.PedidoAdmin(@click="abrir" :style="!e && 'margin-right:8px;cursor:pointer'")
  Titulo(v-if="e" :z="{n:'pedido',fechar:admin}")
  .campo.col(v-if="e" style="margin-bottom: 14px")
    label.tu Status
    select.pt(v-model="z.status")
      option(value="novo") Novo
      option(value="entregue") Entregue
  .row.wp
    .campo.col(style="font-size: 22px")
      label Total (R$)
      b.cg {{real(z.total)}}
    .campo.col(style="margin-bottom: 12px")
      label.tu Dia
      b(style="font-size: 20px") {{dh(z.dia)}}
  .campo(v-if="e" style="overflow:auto")
    .container(style="min-width:400px;padding-bottom:20px")
      p.row.ac(style="background:#f1f1f1;padding:10px;border-radius:4px") 
        label(style="width:200px") Produto
        label(style="width:140px") Preço (R$)
        label(style="width:120px") Quantidade
        label(style="width:100px") Total (R$)
      p.row.ac(v-for="p,i in z.produtos")
        img(:src="p.foto[0].src" style="width: 60px")
        .col(style="width:160px") 
          b {{p.nome}}
          span {{p.categoria.nome}}
        b(style="width:140px") {{p.preco}}
        b(style="width:120px") x{{p.qtd}}
        b(style="width:100px") {{real(parseFloat(p.qtd*parseFloat(p.preco)).toFixed(2))}}
  Cliente(:z="z.cliente" :r="true")
  button.fechar(v-if="app.a && e" @click="salvar") SALVAR
</template>

<style lang="sass">
.PedidoAdmin
  label
    color: var(--main)
</style>