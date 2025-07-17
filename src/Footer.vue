<script setup>
import { inject, ref } from 'vue'
var { app, chat, send } = inject('shopbot')
// import  from '@/comp/.vue'
var msg = ref("")
var select = ref()
function text(e, v) {
    e.preventDefault();
    let m = msg.value
    if (app.value.bot[app.value.step].hide) m = '******'
    chat.value.push({ user: app.value.client, m: m })
    if (app.value.bot[app.value.step].cb)
        setTimeout(() => (app.value.bot[app.value.step].cb(msg.value), msg.value = ''), 200)

}

function save() {

}

</script>

<template lang="pug">
.Footer
    .inputs.row.ac
        .form.su.border.bw(v-if="app.input.form")
            .n.row.ac
                i.fa(:class="app.input.i")
                b {{app.input.n}}
            .campo.col(v-for="c in app.input.form")
                label {{c.n}}
                input(v-if="c.t=='t'" :placeholder="c.n")
                input(v-if="c.t=='n'" type="number" :placeholder="c.n")
        .select.su.border.bw(v-if="app.input.select")
            .o.pt.fb(v-for="{o,e} in app.input.select" @click="app.input = {};send({e:e})") {{o}}
        template(v-if="!app.input")
            textarea.su(v-model="msg" @keydown.enter="text" placeholder="Mensagem")
            //button.short.fa.fa-floppy-disk(@click="save" title="SALVAR")
            button.send.fa.fa-paper-plane(@click="text" title="ENVIAR")
    .probox.tc.fb
        a(href="https://probox.app" target="_blank") © PROBOX

</template>

<style lang="sass" scoped>
.Footer
    .inputs
        padding: 0 5%
    .form
        border-radius: 12px
        background: white
        padding: 18px 16px
        width: 100%
        .n
            font-size: 30px
            padding-bottom: 15px
            color: #666
            i
                margin-right: 8px
        .campo
            label
                text-transform: capitalize
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
                background: rgba(#00FF7F,.6)
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
        padding: 12px 4px
        a, a:visited
            color: #8d00fc
            text-decoration: none
    .su
        animation: su .5s
        box-shadow: 0 2px 6px #aaa
    @keyframes su 
        0%
            margin-bottom: -500px
            opacity: 0 
        100%
            margin-bottom: 0px
            opacity: 1
        

</style>
