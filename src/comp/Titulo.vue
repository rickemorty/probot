<script setup>
let { z } = defineProps(['z'])
</script>

<template lang="pug">
.Titulo.row.js.ac {{z.n}}
  i.fa.fa-times.pt(v-if="z.fechar" @click="z.fechar" title="FECHAR")
  i.fa.fa-trash.pt(v-if="z.del" @click="z.del" title="EXCLUIR")
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
  .fa-trash
    padding: 2px
    &:hover
      color: #fd5755
</style>