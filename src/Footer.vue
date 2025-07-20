<script setup>
import Produto from './comp/Produto.vue'
import { inject, ref } from 'vue'
var { app, chat, send, scroll, update } = inject('shopbot')
var msg = ref("")

function txt(e, v) {
    e.preventDefault();
    let m = msg.value
    if (app.value.input.h) m = '******'
    chat.value.push({ user: app.value.client, m: m })
    scroll()
    if (app.value.input.cb)
        setTimeout(() => (app.value.input.cb(msg.value), msg.value = ''), 200)
    else msg.value = ''
}

function save() {

}

function option({ e, o }) {
    app.value.input = {};
    chat.value.push({ user: app.value.client, m: o })
    if (e) {
        if (e == 'produto') app.value.input.produto = true
        else send({ e: e })
    }
}
</script>

<template lang="pug" scoped>
.Footer
    .inputs
        //Form(v-if="app.input.form") 
        Produto(v-if="app.input.produto" :e="true") 
        .select.in.sh.border.bw(v-if="app.input.select" :class="app.talk && 'out'")
            .o.pt.fb(v-for="o in app.input.select" @click="option(o)") {{o.o}}
        .txt.in.row.ac.sh(v-if="!app.input.select && !app.input.produto")
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
        width: 86%
        border: none
        font-size: 16px
        color: var(--text)
        font-weight: bold        
    .border
        border-left: 2px solid var(--main)
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
        padding: 12px 4px
        a, a:visited
            color: #666
            text-decoration: none
            &:hover
                color: $p
</style>
