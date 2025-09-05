<script setup>
import { inject, watch } from 'vue'
var { chat, app, roll } = inject('lilo')
import Pedido from './comp/PedidoAdmin.vue'
import Produto from './comp/Produto.vue'
import Cliente from './comp/Cliente.vue'
const nome = (c) => !c.user ? app.value.nome : (c.user == app.value.client ? 'Você' : c.user)
const br = (m) => typeof m == 'string' ? m.replace(/\n/g, '<br/>') : m

watch(chat.value, roll)
</script>

<template lang="pug">
.Chat.col
  .msg(v-for="c,i in chat" :class="`${c.user && c.user==app.client ? 'right col ae':'left'}`")
    .n.fb(v-if="i==0 || (nome(chat[i-1])!=nome(c))") {{nome(c)}}
      label.tu.cw.bg(v-if="c.n" style="padding: 3px 6px;font-size: 16px;border-radius:4px;margin-left:8px") {{c.n}}
    .m(v-if="c.m" v-html="br(c.m)")
    .row.list(v-if="c.s")
      template(v-for="z in app.input.search && app.input.search.length?c.s.filter(m=>JSON.stringify(m).toLowerCase().includes(app.input.search)):c.s")
        Produto.m(v-if="z.preco" :z="z")
        Cliente.m(v-if="z.cpf" :z="z")
        Pedido.m(v-if="z.cliente" :z="z")

</template>

<style lang="sass" scoped>
.Chat
  flex: 1
  padding: 20px 4px
  padding-bottom: 80px
  overflow-x: hidden
  overflow-y: auto
  .list
    padding-top: 10px
    padding-bottom: 30px
    overflow: auto
    .Cliente, .Produto
      margin-right: 12px
  .msg
    margin: 0 12px
    margin-bottom: 6px
    font-size: 16px
    word-wrap: break-word
    color: var(--text)
    .n
      font-size: 14px
      margin-bottom: 2px
    .m
      border: 1px solid var(--border)
      border-bottom: 3px solid var(--border)
      padding: 12px 14px
      border-radius: 8px
      min-width: 40%
      max-width: 60%
  .left
    .n
      color: var(--main)
    .m
      border-right: 2px solid var(--border)
      background: var(--white)
      animation: lgrow .5s
  .right
    opacity: .7
    .m
      color: white
      background: var(--main)
      border-left: 3px solid var(--border)
      animation: rgrow .5s
  .form
    input
      width: 92%
      border: none
      padding: 12px 2%
      margin: 6px
      border-bottom: 2px solid #888
      &:focus
        border-bottom: 3px solid var(--main)
      &[type='checkbox']
        width: 16px
        height: 16px
        margin: 0
        margin-left: 12px 
      
</style>
