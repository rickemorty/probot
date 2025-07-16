<script setup>
import { reactive, provide, ref } from 'vue'
import Head from './Head.vue'
import Chat from './Chat.vue'
import Footer from './Footer.vue'

const bot = () => {
  let scripts = document.getElementsByTagName('script');
  let last = scripts[scripts.length - 1];
  let url = last.src;
  let p = new URLSearchParams(url)
  return p.get('id')
}

function UID(length = 24) {
  let chars = "abcdef0123456789";
  let r = "";
  while (length > 0) {
    r += chars.charAt(Math.floor(Math.random() * chars.length));
    length--;
  }
  return r;
}

if (!localStorage.getItem('probox')) localStorage.setItem('probox', UID())
const ID = localStorage.getItem('probox')
var chat = ref([])
var app = ref({ id: bot(), client: ID, step: 0, talk: false, input: '', nome: 'Probox', avatar: "https://probox.app/img/logow.svg", sacola: { produtos: [] } })
var ws = reactive({});
var load = ref(true)
const send = (d) => ws.send(JSON.stringify({ id: app.value.id, client: app.value.client, ...d }))

const update = (msg) => {
  var { id, m=false, form, list, products, button, cb, n } = msg
  if (m) {
    if (typeof m === 'string') m = [m]
    m.map((msg, i) => setTimeout(() => chat.value.push({ m: msg }), i * 222))
    let ct = document.querySelector('#shopbot .Chat')
    if (ct) setTimeout(() => ct.scrollTo(0, 10000), m.length * 250)
  }
  if (n) app.value.input = msg
}

const go = (s = false) => {
  if (s > -1 && app.value.bot[s]) (app.value.step = s, update(app.value.bot[s]))
  else update(app.value.bot[++app.value.step])
}

function WS() {
  ws = new WebSocket('ws://localhost:3000')
  ws.onclose = () => setTimeout(WS(), Math.floor(3000 + Math.random() * 7000))
  ws.onopen = () => send({ e: 'load' })
  ws.onerror = (e) => console.error(e);
  ws.onmessage = ({ data }) => {
    load.value = false
    let m = JSON.parse(data)
    console.log(m);
    app.value.talk = true
    setTimeout(() => {
      if (m.m) update(m)

      if (m.bot) {
        document.head.innerHTML += `<style>:root {${m.style}}</style>`;
        m.bot.map((s, i) => s.cb && (m.bot[i].cb = eval(s.cb)))
        app.value = { ...app.value, ...m }
      }
      if (m.s > -1) (app.value.step = m.s, update(app.value.bot[m.s]))
      app.value.talk = false
    }, 1000)

  }
}
WS()

provide('shopbot', { app, send, chat, update })

</script>

<template lang="pug">
.col.ac.jc(v-if="load" style="height: 100vh")
  .load
.col.container(v-else)
  Head
  Chat
  Footer
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')
$s: 850px
$m: 992px
$g: 1440px
$gr: #00FF7F 
body
  margin: 0
  height: 100vh
#shopbot  
  font-family: 'Roboto', sans-serif
  color: #333
  background: #eee  
  height: 100%
  *
    transition: all 250ms
  button
    border: none
    cursor: pointer
    background: none
  .container
    height: 100%
  .row
      display: flex
      flex-direction: row 
  .col
      display: flex
      flex-direction: column
  @media (max-width: $s)
      .row-s
          display: flex
          flex-direction: row
      .col-s
          display: flex
          flex-direction: column
  .wp
      flex-wrap: wrap
  .ac
      align-items: center
  .ae
      align-items: end
  .jc
      justify-content: center
  .js
      justify-content: space-between
  .je
      justify-content: flex-end
  .tc
    text-align: center
  .mt
      margin-top: 10px
  .fb
    font-weight: bold
  .cw
    color: white
  .pt
    cursor: pointer
  .cb
    color: #23a6d5
  .cg
    color: #00FF7F
  .cp
    color: #8D00FC
  .bw
    background: white
  .load
      width: 48px
      height: 48px
      margin: auto
      display: flex
      position: relative
      transform-origin: 50% 125%
      animation: mov-y 1s infinite linear
      &:before, &:after
        background: linear-gradient(#23a6d5, #8D00FC)
        content:""
        flex:1
        transform-origin: 0% 100%
        animation: rtr-x 1s infinite linear
      &:before 
        transform-origin: 100% 100%
        animation-name: rtr-rx
      @keyframes mov-y
        0%,25% 
          transform: translateY(0) scaleY(1)
        49%
          transform: translateY(-75%) scaleY(1)
        50%      
          transform: translateY(-75%) scaleY(-1)
        75%,100% 
          transform: translateY(-150%) scaleY(-1)
      @keyframes rtr-x
        25%,75% 
          transform: rotate(0deg)
        50%     
          transform: rotate(90deg)
      @keyframes rtr-rx
        25%,75% 
          transform: rotate(0deg)
        50%     
          transform: rotate(-90deg)    
</style>
