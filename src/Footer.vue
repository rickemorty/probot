<script setup>
import Categoria from './comp/Categoria.vue'
import Produto from './comp/Produto.vue'
import { inject, ref } from 'vue'
var { app, chat, send, update, categorias, oi } = inject('shopbot')
var msg = ref("")

const categoria = { nome: "", foto: [], desc: "", ativo: true }
const produto = { categoria: "", nome: "", foto: [], desc: "", preco: "", qtd: 1, ativo: true }

const mid = { //{ e, o, v }
  oi: oi,
  login: () => update({
    m: `Informe o seu <b>E-mail</b>:`, cb: (e) => update({
      m: `Confirme a <b>Senha</b> por gentileza.`, h: true,
      cb: (s) => send({ e: 'login', m: { email: e, senha: s } })
    })
  }),
  ocategoria: () => setTimeout(() => app.value.input = { n: 'CATEGORIA', select: [{ e: 'categoria', o: 'Nova' }, { e: 'categorias', o: 'Editar' }] }, 300),
  oproduto: () => setTimeout(() => app.value.input = { n: 'PRODUTO', select: [{ e: 'produto', o: 'Novo' }, { e: 'categorias', v: 'p', o: 'Editar' }] }, 300),
  categoria: ({ v }) => app.value.input = { categoria: v || categoria },
  produto: ({ v }) => app.value.input = { produto: v || produto },
  txt: (m) => { app.value.input = { txt: true, cb: (m) => send({ e: 'ia', m: m }) } },
  concluir: () => { // solicitar endereço,forma de pagamento, horario de entrega
  },
}

function option(m) {
  app.value.input = {}
  chat.value.push({ user: app.value.client, m: m.o })
  if (m.e) {
    if (mid[m.e]) mid[m.e](m)
    else send({ e: m.e, o: m.v || m.o })
  }
}

function txt(e) {
  e.preventDefault();
  let m = msg.value
  if (app.value.input.h) m = '******'
  chat.value.push({ user: app.value.client, m: m })
  if (msg.value.toLowerCase() == 'admin') { mid.login(); msg.value = ''; return }
  setTimeout(() => { app.value.input.cb ? app.value.input.cb(msg.value) : send({ e: 'ia', m: msg.value }); msg.value = '' }, 200)
}

console.log(app.value.input);
</script>

<template lang="pug" scoped>
.Footer
    .inputs
        //Form(v-if="app.input.form") 
        Categoria.in(v-if="app.input.categoria" :c="app.input.categoria" :e="true") 
        Produto.in(v-if="app.input.produto" :p="app.input.produto" :e="true") 
        .select.in.sh.border.bw(v-if="app.input.select" :class="app.talk && 'out'")
            .tipo.fb(v-if="app.input.n") {{app.input.n}}
            .o.pt.fb(v-for="o in app.input.select" @click="option(o)") {{o.o}}
        .txt.in.row.ac.sh(v-if="app.input.txt")
            textarea(v-model="msg" @keydown.enter="txt" placeholder="Mensagem")
            //button.short.fa.fa-floppy-disk(@click="save" title="SALVAR")
            button.send.fa.fa-paper-plane(@click="txt" title="ENVIAR")
    .probox.tc.fb
        a(href="https://probox.app" target="_blank") © PROBOX
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
  .txt
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
  .select
    width: 100%
    border-radius: 12px
    overflow: hidden
    .o
        padding: 18px 12px
        border-top: 1px solid #ddd
        text-transform: uppercase
        color: #555
        &:hover
            background: rgba($g,.6)
  .short
    font-size: 22px
    margin-left: -30px
    &:hover
        color: var(--green)
        font-size: 26px
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
