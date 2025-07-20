<script setup>
import { reactive, provide, ref, onMounted } from 'vue'
import Head from './Head.vue'
import Chat from './Chat.vue'
import Footer from './Footer.vue'

function UID(length = 24) {
  let chars = "abcdef0123456789";
  let r = "";
  while (length > 0) {
    r += chars.charAt(Math.floor(Math.random() * chars.length));
    length--;
  }
  return r;
}
const ID = document.getElementById('probox').src.split('id=')[1] || 'luzia'
if (!localStorage.getItem('probox')) localStorage.setItem('probox', UID())
const CLIENT = localStorage.getItem('probox')
var chat = ref([])
var app = ref({ id: ID, client: CLIENT, step: 0, input: {}, talk: false, nome: 'Probox', avatar: "https://probox.app/img/logow.svg", sacola: { produtos: [] } })
var ws = reactive({});
var load = ref(true)
const send = (d) => ws.send(JSON.stringify({ id: app.value.id, client: app.value.client, ...d }))
const scroll = (n) => {
  let ct = document.querySelector('#shopbot .Chat')
  if (ct) setTimeout(() => ct.scrollTop = ct.scrollHeight, 250)
}
const update = (m) => {
  app.value.talk = true
  if (m.style) {
    document.head.innerHTML += `<style>:root {${m.style}}</style>`;
    app.value = { ...app.value, ...m }
  }
  if (m.cb) m.cb = eval(m.cb)
  setTimeout(() => {
    if (m.m) {
      if (typeof m.m === 'string') m.m = [m.m]
      m.m.map((msg, i) => setTimeout(() => (chat.value.push({ m: msg }), scroll()), i * 222))
    }
    if(m.p) m.p.map((p, i) => setTimeout(() => (chat.value.push({ p: p }), scroll()), i * 222))
    scroll()
    app.value.input = m
    app.value.talk = false
  }, 1000)
}

/* const go = (s = false) => {
  if (s > -1 && app.value.bot[s]) (app.value.step = s, update(app.value.bot[s]))
  else update(app.value.bot[++app.value.step])
} */

function WS() {
  ws = new WebSocket('ws://localhost:3000')
  ws.onclose = () => setTimeout(WS(), Math.floor(3000 + Math.random() * 7000))
  ws.onopen = async () => send({ e: 'load' })
  ws.onerror = (e) => console.error(e);
  ws.onmessage = ({ data }) => {
    load.value = false
    let m = JSON.parse(data)
    console.log(m);
    update(m)
  }
}
provide('shopbot', { app, send, chat, update, scroll })
WS()

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
    cursor: pointer    
  label
    color: var(--main)
    font-size: 14px
  input:focus, textarea:focus
    outline: none
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
  .tu
    text-transform: uppercase
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
  .sh
    box-shadow: 0 2px 6px #aaa
  .in
      animation: in .5s
  .out
      animation: out .5s
  @keyframes in 
      0%
          margin-bottom: -500px
      100%
          margin-bottom: 0px
  @keyframes out
      100%
          margin-bottom: -500px  
</style>
