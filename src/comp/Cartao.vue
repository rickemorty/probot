<script setup>
import { inject, reactive, ref } from 'vue'
let cartao = ref({
    holderName: "marcelo h almeida",
    number: "5162306219378829",
    expiryMonth: "10",
    expiryYear: "2028",
    ccv: "318"
})

</script>

<template lang="pug">
.Cartao.input.border.bw
    .campo.col
        label NOME 
        input(placeholder="Igual ao do cartão.")
    .campo.col
        label NÚMERO
        input(placeholder="Número do cartão.")
    .campo.row
        .col
            label VALIDADE (MÊS/ANO)
            .row
                input(placeholder="MM")
                input(placeholder="AA")
        .col
            label CVC
            input(placeholder="000")


</template>

<style lang="sass" scoped>
$g: #00FF7F
.Cartao
</style>