<script setup>
import { ref } from 'vue'
import { cep } from '../canivet'
let { z } = defineProps(['z'])
z.cep = cep(z.cep)
var invalid = ref(false)

async function valid() {
  let cep = z.cep.replace(/\D/g, '');
  if (cep.length == 8) {
    z.logradouro = ""
    z.cidade = ""
    z.bairro = ""
    z.uf = ""
    invalid.value = false
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      if (data.erro) {
        invalid.value = true
        chat.value.push({ m: '<b class="cr">CEP não encontrado.</b>' });
        return
      }
      z.logradouro = data.logradouro
      z.cidade = data.localidade
      z.bairro = data.bairro
      z.uf = data.uf
    } catch (e) {
      chat.value.push({ m: '<b class="cr">Erro ao consultar o CEP. Tente novamente.</b>' });
      console.error(e);
    }
  }
}
</script>

<template lang="pug">
.Endereco
  .row.ac
    .col.cep
      label CEP
      input(v-model="z.cep" @input="valid()" v-mask="'cep'" placeholder="CEP")
    .fb.cr(v-if="invalid" style="margin-left: 12px") CEP não encontrado.
  .col(v-if="z.logradouro")
    label.cp ENDEREÇO
    b {{z.logradouro}} - {{z.bairro}} - {{z.cidade}}/{{z.uf}}
  .row.fb(v-if="z.logradouro" style="margin-top:12 px")
    .col(style="width:30%")
      label.cp NÚMERO
      input(type="number" v-model="z.n" placeholder="N°")
    .col(style="width:70%")
      label.cp COMPLEMENTO
      input(v-model="z.comp" placeholder="Comp.")
</template>

<style lang="sass" scoped>
.Endereco
	input
		margin-bottom: 12px
		width: 90%
	.cep
		width: 110px    
</style>