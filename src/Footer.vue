<script setup>
import { inject, ref } from 'vue'
var { app, chat } = inject('shopbot')
// import  from '@/comp/.vue'
var msg = ref("")
var select = ref()
function send(e) {
    e.preventDefault();
    let m = msg.value
    if (app.value.bot[app.value.step].hide) m = '******'
    chat.value.push({ user: app.value.client, m: m })
    if (app.value.bot[app.value.step].cb)
        setTimeout(() => (app.value.bot[app.value.step].cb(msg.value),msg.value = ''), 200)
    
}

function save() {

}

</script>

<template lang="pug">
.Footer
    .inputs.row.ac
        .select.bw(v-if="app.input.select")
            .o(v-for="{o,e} in app.input.select" @click="e") {{o}}

        template(v-if="!app.input")
            textarea(v-model="msg" @keydown.enter="send" placeholder="Mensagem")
            //button.short.fa.fa-floppy-disk(@click="save" title="SALVAR")
            button.send.fa.fa-paper-plane(@click="send" title="ENVIAR")
    .probox.tc.fb
        a(href="https://probox.app" target="_blank") © PROBOX

</template>

<style lang="sass" scoped>
.Footer
    .inputs
        padding: 0 5%
    .select
        border: none
        width: 100%
        padding: 10px
        border-radius: 12px
        border-left: 4px solid var(--main)
        border-bottom: 5px solid var(--main)
        .o
            padding: 20px 10px
            border-top: 1px solid #ccc
            color: black
    textarea
        background: white
        padding: 14px
        border-radius: 12px
        width: 86%
        border: none
        font-size: 16px
        color: var(--text)
        font-weight: bold
        border-left: 3px solid #ccc
        border-bottom: 3px solid #ccc
        &:focus
            border-left: 4px solid var(--main)
            border-bottom: 5px solid var(--main)
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
        padding: 10px 4px
        a, a:visited
            color: #8d00fc
            text-decoration: none
</style>
