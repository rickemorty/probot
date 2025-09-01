<script setup>
let { z } = defineProps(['z'])
import {cpf} from '../canivet'
z.cpf = cpf(z.cpf) 
import { ref } from 'vue'
var icpf = ref(false)

function invalida() {
  icpf.value = true;
}

function valida() {
  icpf.value = false;
  if (z.cpf.length == 14) {
    let c = z.cpf.replace(/\D/g, '');

    if (/^(\d)\1+$/.test(c)) return invalida()
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(c[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(c[9])) return invalida()
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(c[i]) * (11 - i); -0
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(c[10])) return invalida()
  }
}
</script>

<template lang="pug">
.CPF
  label CPF
  input(v-model="z.cpf" @input="valida" v-mask="'cpf'" placeholder="CPF")
  b.cr(v-if="icpf" style="margin: 8px 12px;font-size:13px") CPF INVÁLIDO
</template>
