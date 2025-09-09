<script setup>
let { z } = defineProps(['z'])
import { inject } from 'vue'
var { app,roll } = inject('lilo')
roll()
</script>

<template lang="pug">
.Titulo.row.js.ac {{z.n}}
  i.fa.fa-times.pt(v-if="z.fechar" @click="z.fechar" title="FECHAR")
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
  box-shadow: inset 1px 0 50px rgba(black,.3)
  filter: contrast(120%)
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