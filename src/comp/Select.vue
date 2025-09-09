<script setup>
import { inject, ref } from 'vue'
var { app, chat, send, oi, pagamento, login,sacola } = inject('lilo')
import Titulo from './Titulo.vue'
var titulo = ref((app.input && app.input.n) || 'Selecione')
const categoria = { nome: "", foto: [], desc: "", ativo: true }
const produto = { categoria: "", nome: "", foto: [], desc: "", preco: "", qtd: 1, ativo: true }
const cliente = { cpf: "", nome: "", email: "", fone: [''], endereco: [{ cep: '', logradouro: '', n: '', comp: '', bairro: '', cidade: '', uf: '' }] }

const mid = { //{ e, o, v }
  oi: oi,
  login: login,
  ocategoria: () => app.value.input = { n: 'CATEGORIA', select: [{ e: 'categoria', o: 'Nova' }, { e: 'categorias', o: 'Editar' }] },
  oproduto: () => app.value.input = { n: 'PRODUTO', select: [{ e: 'produto', o: 'Novo' }, { e: 'categorias', v: 'p', o: 'Editar' }] },
  ocliente: () => app.value.input = { n: 'CLIENTE', select: [{ e: 'cliente', o: 'Novo' }, { e: 'clientes', o: 'Editar' }] },
  categoria: ({ v }) => app.value.input = { categoria: v || categoria },
  produto: ({ v }) => app.value.input = { produto: v || produto },
  cliente: ({ v }) => app.value.input = { cliente: v || cliente },
  txt: (m) => app.value.input = { txt: true, cb: (m) => send({ e: 'ia', m: m }) },
  pedido: () => app.value.input = { n: 'pedido', select: [{ e: 'pedidos', v: 'novo', o: 'Novos' }, { e: 'pedidos', v: 'entregue', o: 'Entregue' }] },
  concluir: () => app.value.input = { pedido: true },
  forma: () => app.value.forma,
  pix: () => { app.value.pedido.forma = 'PIX'; pagamento() },
  copiar: ({ v }) => { chat.value.push({ m: 'Código Pix copiado.' }); navigator.clipboard.writeText(v) },
  cartao: () => { app.value.pedido.cartao = { nome: '', n: '', mes: '', ano: '', ccv: '' }; setTimeout(() => app.value.input = { cartao: true }, 500) }
}

function option(m) {
  app.value.ativar()
  chat.value.push({ user: app.value.client, m: m.o })
  if (m.e) {
    if (mid[m.e]) setTimeout(() => mid[m.e](m), 400)
    else send({ e: m.e, o: m.v || m.o })
  }

}
</script>

<template lang="pug">
.Select
  Titulo(:z="{n:'Selecione'}")
  .o.pt.fb(v-for="o in app.input.select" @click="option(o)") {{o.o}}
  .o.pt.fb(v-if="app.pedido.produtos.length" @click="sacola") Finalizar Compra
  .o.pt.fb(@click="app.ativar({txt:true})") Dúvidas
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