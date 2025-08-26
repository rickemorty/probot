<script setup>
import { inject, ref, watch } from 'vue'
var { chat, app } = inject('shopbot')
import Produto from './comp/Produto.vue'
import Cliente from './comp/Cliente.vue'
const nome = (c) => !c.user ? app.value.nome : (c.user == app.value.client ? 'Você' : c.user)
const br = (m) => typeof m == 'string' ? m.replace(/\n/g, '<br/>') : m

watch(chat.value, () => {
  let ct = document.querySelector('#shopbot .Chat')
  if (ct) setTimeout(() => ct.scrollTop = ct.scrollHeight + 1000, 500)
})
</script>

<template lang="pug">
.Chat.col
  .msg(v-for="c,i in chat" :class="`${c.user && c.user==app.client ? 'right col ae':'left'}`")
    .n.fb(v-if="i==0 || (nome(chat[i-1])!=nome(c))") {{nome(c)}}
    .m(v-if="c.m" v-html="br(c.m)")
    .row(v-if="c.s")
      template(v-for="z in c.s")
        Produto.m(v-if="z.preco" :z="z")
        Cliente.m(v-if="z.cpf" :z="z")
</template>

<style lang="sass" scoped>
.Chat
  flex: 1
  padding: 20px 4px
  padding-bottom: 40px
  overflow-x: hidden
  overflow-y: auto
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
