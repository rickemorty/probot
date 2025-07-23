<script setup>
let { e, c } = defineProps(['e', 'c'])
import Chave from './Chave.vue'
import Foto from './Foto.vue'
import { inject, reactive, ref } from 'vue'
var { app, send, scroll, chat } = inject('shopbot')
var categoria = reactive({})
if (c) categoria = c
if (!app.value.a && app.value.pedido.produtos.filter(p => p._id == categoria._id).length == 0) categoria.qtd = 0
const abrir = () => { if (!e) { app.value.input.categoria = categoria } }
function fechar() {
    out.value = true
    if (categoria.nome) {
        send({ e: "novo", c: categoria })
        chat.value.push({ user: app.value.client, m: `Cadastrar a categoria: <b>${categoria.nome}.</b>` })
        setTimeout(() => { app.value.input = {}; out.value = false }, 300)
        setTimeout(() => chat.value.push({ m: `Cadastrando ${categoria.nome}...` }), 300)
    }else app.value.input.select = [{ e: 'pc', o: "Novo Produto/Categoria" }, { e: 'categorias', o: 'Editar Produtos' }]
    setTimeout(() => { app.value.input = {}; out.value = false }, 300)
    scroll(500)
}
var out = ref(false)
</script>

<template lang="pug">
.Categoria.input.border.bw(@click="abrir" :class="`${out && 'out'} ${!e ? 'fechado pt':'sh'}`")
    .tipo.row.ac(v-if="e && app.a")
        i.fa.fa-layer-group
        b Categoria
    .campo.col
        label(v-if="e && app.a") FOTO
        Foto(v-if="e && app.a" :cb="(v)=>categoria.foto=v" :e="e")
        img.foto(v-else :src="categoria.foto[0].src || ''")
    .campo.col
        label(v-if="e && app.a") NOME
        input(v-if="e && app.a" v-model="categoria.nome" placeholder="Nome da categoria.")
        .nome.fb.tc(v-else) {{categoria.nome}}
    .campo.col(v-if="e")
        label(v-if="e && app.a") DESCRIÇÃO
        textarea(v-if="e && app.a" v-model="categoria.desc" placeholder="Descrição.")
        .desc.tc(v-else) {{categoria.desc}}
    .campo.col(v-if="e && app.a")
        label ATIVO
        Chave(:t="{on: categoria.ativo, cb:()=>categoria.ativo=!categoria.ativo}")
    button.fechar(v-if="e && app.a" @click="fechar") 
        i.fa.fa-circle-down
        | FECHAR
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Categoria
    
</style>