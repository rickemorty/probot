<script setup>
import Categoria from './comp/Categoria.vue'
import Produto from './comp/Produto.vue'
import Pedido from './comp/Pedido.vue'
import Apedido from './comp/PedidoAdmin.vue'
import Cartao from './comp/Cartao.vue'
import Cliente from './comp/Cliente.vue'
import Select from './comp/Select.vue'
import { inject, ref, onUpdated } from 'vue'
var { app, chat, send, login } = inject('lilo')
var msg = ref("")
onUpdated(() => {
  let e = false
  if (app.value.input.txt) e = 'txt'
  if (app.value.input.s) e = 'search'
  if (e) {
    let h = document.getElementById(e)
    if (h) setTimeout(() => h.focus(), 800)
  }
})

function txt(e) {
  e.preventDefault();
  let m = msg.value
  if (app.value.input.h) m = '******'
  chat.value.push({ user: app.value.client, m: m })
  if (msg.value.toLowerCase() == 'admin') {
    login()
    msg.value = '';
    return
  }
  if (app.value.input.cb) app.value.input.cb(msg.value)
  else send({ e: 'ia', m: msg.value });
  msg.value = ''
}

</script>

<template lang="pug" scoped>
.Footer
  .inputs.col(:class="`${app.out && 'out'}`")
    .txt.in.row.ac.sh(v-if="app.input.txt")
      textarea(v-model="msg" @keydown.enter="txt" id="txt" placeholder="Mensagem")
      button.send.fa.fa-paper-plane(@click="txt" title="ENVIAR")
    input.s(v-if="app.input.s" v-model="app.input.search" placeholder="Procurar" id="search")
    Categoria.input.border.bw.sh(v-if="app.input.categoria" :z="app.input.categoria" :e="true") 
    Produto.input.border.bw.sh(v-if="app.input.produto" :z="app.input.produto" :e="true")
    Select.input.sh.border.bw(v-if="app.input.select")
    Pedido.input.border.bw.sh(v-if="app.input.pedido")
    Apedido.input.border.bw.sh(v-if="app.input.apedido" :z="app.input.apedido" :e="true")
    Cartao.input.border.bw.sh(v-if="app.input.cartao")
    Cliente.input.border.bw.sh(v-if="app.input.cliente" :z="app.input.cliente" :e="true")
  .probox.tc.fb
    a(href="https://probox.app" target="_blank") 
      i.fa.fa-lock
      |  AMBIENTE SEGURO - PROBOX
</template>

<style lang="sass" scoped>
$g: #00FF7F
$p: #8d00fc
.Footer
  .inputs
    padding: 0 5%
    margin-bottom: 44px
    position: relative
    z-index: 777
  .txt,.s
    background: white
    border-left: 3px solid #ccc
    border-bottom: 3px solid #ccc
    border-radius: 12px
    padding: 14px
    &:focus-within
        border-left: 4px solid var(--main)
        border-bottom: 5px solid var(--main)
  textarea
    flex: 1
    border: none
    font-size: 16px
    color: var(--text)
    font-weight: bold        
  .border
    border-bottom: 4px solid var(--main)
  .send
    margin-left: 6px
    padding: 4px
    color: var(--text)
    font-size: 30px
    border: none
    background: none
    &:hover
        color: var(--green)
        font-size: 34px
  .probox
    font-size: 12px
    padding: 12px 0
    width: 100%
    position: absolute
    bottom: 0
    a, a:visited
        color: #666
        text-decoration: none
        &:hover
            color: $p
</style>
