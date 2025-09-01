<script setup>
import Titulo from './Titulo.vue'
import { inject, ref } from 'vue'
var { app, chat, send, oi, pagamento, login } = inject('shopbot')
var titulo = ref((app.input && app.input.n) || 'Selecione')
const categoria = { nome: "", foto: [], desc: "", ativo: true }
const produto = { categoria: "", nome: "", foto: [], desc: "", preco: "", qtd: 1, ativo: true }
const cliente = { cpf: "", nome: "", email: "", fone: [''], endereco: [{ cep: '', logradouro: '', n: '', comp: '', bairro: '', cidade: '', uf: '' }] }

const mid = { //{ e, o, v }
  oi: oi,
  login: login,
  ocategoria: () => setTimeout(() => app.value.input = { n: 'CATEGORIA', select: [{ e: 'categoria', o: 'Nova' }, { e: 'categorias', o: 'Editar' }] }, 300),
  oproduto: () => setTimeout(() => app.value.input = { n: 'PRODUTO', select: [{ e: 'produto', o: 'Novo' }, { e: 'categorias', v: 'p', o: 'Editar' }] }, 300),
  ocliente: () => setTimeout(() => app.value.input = { n: 'CLIENTE', select: [{ e: 'cliente', o: 'Novo' }, { e: 'clientes', o: 'Editar' }] }, 300),
  categoria: ({ v }) => app.value.input = { categoria: v || categoria },
  produto: ({ v }) => app.value.input = { produto: v || produto },
  cliente: ({ v }) => app.value.input = { cliente: v || cliente },
  txt: (m) => app.value.input = { txt: true, cb: (m) => send({ e: 'ia', m: m }) },
  concluir: () => app.value.input = { pedido: true },
  forma: () => app.value.forma,
  pix: () => { app.value.pedido.forma = 'PIX'; pagamento() },
  copiar: ({ v }) => { chat.value.push({ m: 'Código Pix copiado.' }); navigator.clipboard.writeText(v) },
  cartao: () => { app.value.pedido.cartao = { nome: '', n: '', mes: '', ano: '', ccv: '' }; setTimeout(() => app.value.input = { cartao: true }, 500) }
}

function option(m) {
  app.value.down()
  chat.value.push({ user: app.value.client, m: m.o })
  if (m.e) {
    if (mid[m.e]) mid[m.e](m)
    else send({ e: m.e, o: m.v || m.o })
  }

}
</script>

<template lang="pug">
.Select
  Titulo(:z="{n:'Selecione'}")
  .o.pt.fb(v-for="o in app.input.select" @click="option(o)") {{o.o}}
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Select
  .Titulo
    margin-bottom: 0
  .o
    padding: 18px 12px
    border-top: 1px solid #ddd
    text-transform: uppercase
    color: #555
    &:hover
        background: rgba($g,.6)
</style>