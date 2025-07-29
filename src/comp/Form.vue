<script setup>
import Chave from './comp/Chave.vue'
import Foto from './comp/Foto.vue'
import { inject, ref } from 'vue'
var { app, chat, send, update } = inject('shopbot')
</script>

<template lang="pug">
.Form.in.sh.border.bw(v-if="app.input.form" :class="app.talk && 'out'")
    .n.row.ac
        i.fa(:class="app.input.i")
        b {{app.input.n}}
    .campo.col(v-for="c in app.input.form")
        label {{c.n}}
        Foto(v-if="c.t=='f'" :cb="(v)=>c.v=v")
        input(v-if="c.t=='t'" :placeholder="c.n")
        input(v-if="c.t=='n'" type="number" :placeholder="c.n")
        Chave(v-if="c.t=='b'" :t="{on: c.v, cb:()=>c.v=!c.v}")
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Form
</style>