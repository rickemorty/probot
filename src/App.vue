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
var ws = reactive({});
var load = ref(true)
var categorias = ref([])
const send = (d) => ws.send(JSON.stringify({ id: app.value.id, client: app.value.client, ...d }))
const opt = [{ e: 'pedidos', o: 'Pedidos' }, { e: 'ocliente', o: 'Clientes' }, { e: 'oproduto', o: "Produtos" }, { e: 'ocategoria', o: 'Categorias' }]
const oi = () => update({ select: app.value.select })
const update = (m) => {
  if (m.categorias) { categorias.value = m.categorias; return }
  app.value.talk = true
  if (m.style) {
    document.head.innerHTML += `<style>:root {${m.style}}</style>`;
    app.value = { ...app.value, ...m }
    setTimeout(initPush, 1000)
  }
  if (m.cb) m.cb = eval(m.cb)
  if (m.reset) { app.value.pedido.produtos = []; oi() }
  setTimeout(() => {
    if (m.m) {
      if (typeof m.m === 'string') m.m = [m.m]
      m.m.map((msg, i) => setTimeout(() => (chat.value.push({ m: msg })), i * 300))
    }
    if (m.s) chat.value.push({ s: m.s })
    if (m.a) { app.value.a = true; m.select = opt }
    setTimeout(() => { app.value.input = m; app.value.talk = false }, (m.m ? m.m.length + 1 : 1) * 300)

  }, 400)
}

var app = ref({ id: ID, client: CLIENT, step: 0, input: {}, out: false, down: () => { app.value.out = true; setTimeout(() => { app.value.input = {}; app.value.out = false }, 400) }, talk: false, nome: 'Probox', avatar: "https://probox.app/img/logow.svg", pedido: { nome: "", cpf: "", endereco: [{ cep: '' }], fone: [''], produtos: [] }, })
function WS() {
  ws = new WebSocket('ws://localhost:3000')
  ws.onclose = () => setTimeout(WS(), Math.floor(3000 + Math.random() * 7000))
  ws.onopen = async () => send({ e: 'load' })
  ws.onerror = (e) => console.error(e);
  ws.onmessage = ({ data }) => {
    try {
      load.value = false
      let m = JSON.parse(data)
      console.log(m);
      update(m)
    } catch (e) {
      console.error(e);
      console.error(data);
    }
  }
}
const login = () => update({
  m: `Informe o seu <b>E-mail</b>:`, txt: true, cb: (e) => update({
    m: `Confirme a <b>Senha</b> por gentileza.`, txt: true, h: true,
    cb: (s) => send({ e: 'login', m: { email: e, senha: s } })
  })
});
const admin = () => app.value.input = { select: opt }
const pagamento = () => { update({ m: 'Legal, vou gerar os dados de pagamento, um instante...' });send({ e: 'pedido', pedido: app.value.pedido }) }
provide('shopbot', { app, send, chat, update, categorias: categorias, admin, login, pagamento: pagamento, oi: oi })
WS()

async function initPush() {
  const register = await navigator.serviceWorker.register('/worker.js', { scope: '/' });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(app.value.pushkey)
  });
  if (subscription) send({ e: 'sub', subscription })
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
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
$r: #fd6363 
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
  input:focus, textarea:focus
    outline: none
  .container
    height: 100%
  .row
      display: flex
  .row-r
      display: flex
      flex-direction: row-reverse 
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
  .ja
      justify-content: space-around
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
  .cr
    color: #fd5755
  .bw
    background: white
  .sacola
    background-image: url(https://probox.app/shopbot/img/sacola.svg)
    background-size: 100% 100%
    padding: 10px
    padding-top: 20px
    opacity: .9
    color: var(--main)
  .input
    border-radius: 12px
    background: white  
    overflow: hidden       
    animation: lgrow .5s
    border: 1px solid #ccc
    .campo
      margin-bottom: 20px
      padding: 2px 16px
      &:hover label
        color: var(--main)
    select
      border-radius: 6px
    input,textarea, select
      margin-top: 1px
      padding: 12px 10px
      border: none
      border-bottom: 2px solid #ccc
      &:focus
        background: rgba($gr,.2)
        border-bottom: 1px solid $gr         
      &:hover
        border-bottom: 2px solid var(--main)
    .qtd
      color: ciano
      &:hover
        border-bottom: 1px solid $gr
    textarea
      min-height: 100px
    .nome
      font-size: 22px
      margin-top: 4px
  .foto
    background-size: cover
    background-position: center center
    width: 100% 
    height: 300px
  .fechar
    background: rgba($gr,.6)
    font-weight: bold
    width: 100%
    border: none
    padding: 15px 10px
    font-size: 15px
    margin-top: 10px
    i
      margin-right: 5px
  .fechado
    width: 222px 
    overflow: hidden
    padding: 0
    padding-bottom: 10px
    margin-bottom: 10px
    /* border-left: 2px solid #ccc */
    border-bottom: 4px solid #ccc
    &:hover
        border-left: 2px solid var(--main)
        border-bottom: 4px solid var(--main) 
    .foto
      height: 200px
    .campo
        margin: 8px 0
        padding: 0       
    .nome
        margin-top: 4px
    .preco, qtd
        font-size: 22px
  button:hover
      background: $gr
  label
      font-weight: bold
      font-size: 12px
      margin-bottom: 2px
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
      &.s
        width: 24px
        height: 24px
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
      animation: in .4s
  .out
    animation: out .4s
  @keyframes in 
    0%
        margin-bottom: -500px
    100%
        margin-bottom: 0px
  @keyframes out
    100%
      margin-bottom: -700px  
  @keyframes lgrow 
    0%
      margin-left: -100%
    100%
      margin-left:  0px0
  @keyframes rgrow 
    0%
        margin-right: -100%
    100%
        margin-right:  0px 
</style>
