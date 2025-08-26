<script setup>
import Titulo from './Titulo.vue'
import { inject, ref, onUpdated } from 'vue'
var { app, chat, send, update, oi, pagamento } = inject('shopbot')

const mid = { //{ e, o, v }
  oi: oi,
  ocategoria: () => setTimeout(() => app.value.input = { n: 'CATEGORIA', select: [{ e: 'categoria', o: 'Nova' }, { e: 'categorias', o: 'Editar' }] }, 300),
  oproduto: () => setTimeout(() => app.value.input = { n: 'PRODUTO', select: [{ e: 'produto', o: 'Novo' }, { e: 'categorias', v: 'p', o: 'Editar' }] }, 300),
  categoria: ({ v }) => app.value.input = { categoria: v || categoria },
  produto: ({ v }) => app.value.input = { produto: v || produto },
  txt: (m) => app.value.input = { txt: true, cb: (m) => send({ e: 'ia', m: m }) },
  concluir: () => app.value.input = { pedido: true },
  pix: () => { app.value.pedido.forma = 'PIX'; pagamento() },
  copiar: ({ v }) => { update({ m: 'Código Pix copiado.' }); navigator.clipboard.writeText(v) },
  cartao: () => { app.value.pedido.cartao = { nome: '', n: '', mes: '', ano: '', ccv: '' }; app.value.input = { cartao: true } }
}

function option(m) {
  app.value.input = {}
  chat.value.push({ user: app.value.client, m: m.o })
  if (m.e) {
    if (mid[m.e]) mid[m.e](m)
    else send({ e: m.e, o: m.v || m.o })
  }
}
</script>

<template lang="pug">
.Select.input.sh.border.bw
  Titulo(:z="{n:'Selecione'}")
  .o.pt.fb(v-for="o in app.input.select" @click="option(o)") {{o.o}}
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Select
  .o
    padding: 18px 12px
    border-top: 1px solid #ddd
    text-transform: uppercase
    color: #555
    &:hover
        background: rgba($g,.6)
</style>