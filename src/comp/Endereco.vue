<script setup>
import { ref } from 'vue'
let { z,del,r } = defineProps(['z','del','r'])
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
        return
      }
      z.logradouro = data.logradouro
      z.cidade = data.localidade
      z.bairro = data.bairro
      z.uf = data.uf
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<template lang="pug">
.Endereco
  .row.js
    .row.ac
      .col.cep
        label CEP
        input(v-if="!r" v-model="z.cep" @input="valid()" v-mask="'cep'" placeholder="CEP")
        b(v-if="r") {{ z.cep }} 
      .fb.cr(v-if="invalid" style="margin-left: 22px") CEP não encontrado.
    i.fa.fa-trash.c6.hcr.pt(v-if="del && !r" @click="del" title="EXCLUIR")
  .col(v-if="z.logradouro")
    label.cp( style="margin-top:6px") ENDEREÇO
    b {{z.logradouro}} - {{z.bairro}} - {{z.cidade}}/{{z.uf}}
  .row.fb(v-if="z.logradouro" style="margin-top:10px")
    .col(style="width:30%")
      label.cp NÚMERO
      input(v-if="!r" type="number" v-model="z.n" placeholder="N°")
      b(v-else) {{z.n}}
    .col(v-if="z.comp" style="width:70%")
      label.cp COMPLEMENTO
      input(v-if="!r" v-model="z.comp" placeholder="Comp.")
      b(v-else) {{z.comp}}
</template>

<style lang="sass" scoped>
.Endereco
  padding: 14px 20px
  border-radius: 8px
  background: #f1f1f1
  input
    margin-bottom: 12px
    width: 90%
  .cep
    width: 110px
</style>