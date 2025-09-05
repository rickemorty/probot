<script setup>
let { z } = defineProps(['z'])
import { inject } from 'vue'
var { app } = inject('lilo')
</script>

<template lang="pug">
.Titulo.row.js.ac {{z.n}}
  .row.ac
    i.fa.fa-trash.pt(v-if="z.del" @click="z.del" title="EXCLUIR" style="margin-right: 16px")
    i.fa.fa-times.pt(@click="z.fechar" title="FECHAR")
    //.ia.pt(@click="app.ativar({txt:true})" title="Falar com a Lilo.") IA
</template>

<style lang="sass" scoped>
.Titulo
  margin-bottom: 14px
  border-bottom: 1px solid #ddd
  padding: 8px 10px
  font-size: 13px
  color: #eee
  background: var(--main)
  text-transform: uppercase
  font-weight: bold
  opacity: .7
  .ia
    background: #eee
    color: var(--main)
    padding: 4px 6px
    border-radius: 3px
    margin-left: 10px
    &:hover
      font-size: 15px
      display: block
  .fa-trash
    padding: 2px
    &:hover
      color: #fd5755
</style>