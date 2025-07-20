<script setup>
import { reactive } from 'vue'
const { cb } = defineProps(['cb'])
var f = reactive([])

function files() {
    const fi = document.createElement('input')
    fi.type = "file"
    fi.multiple = "multiple"
    fi.addEventListener('change', function () {
        if (fi.files.length) {
            Array.from(fi.files).map(file => {

                let img = { src: '', name: file.name, type: file.type, size: file.size, load: 0 }

                if (!file.type.match("image/jpeg|image/png|image/jpg|image/svg")) img.error = "Tipo de arquivo inválido."
                if (file.size / 1024 / 1024 > 25) img.error = "Tipo de arquivo inválido."

                let index = f.length
                f.push(img)
                let reader = new FileReader();
                reader.onprogress = (e) => { if (e.lengthComputable) f[index].load = Math.round((e.loaded / e.total) * 100) }
                reader.onload = (e) => {
                    //files.value[index].src = e.target.result
                    f[index].src = e.target.result
                    cb(f)
                }

                reader.readAsDataURL(file);
            })
        }
    })
    fi.click()
}
</script>

<template lang="pug">
.Foto
    button.add.fb.fa.fa-plus(@click="files" title="ADICIONAR")
    .row.ac
        .file.col.ac(v-for="v,j in f")
            input.tc(v-model="v.name")
            img(:src="v.src" :alt="v.name")
            i.fa.fa-trash(@click="f.splice(j,1)" title="EXCLUIR ARQUIVO")
</template>

<style lang="sass" scoped>
$g: #00FF7F
.Foto
    .add
        width: 36px
        height: 34px
        font-size: 16px;
        color: #666
        border-radius: 6px
        &:hover
            background: $g
    .file
        margin: 6px 12px
        margin-left: 0
        overflow: hidden
        width: 170px
        background: white
        border-radius: 8px
        border: 2px solid #ccc
        border-bottom: 4px solid #ccc
        input
            margin: 0
            padding: 6px
        img
            width: 100%
            height: 150px
            cursor: pointer
        .fa
            padding: 6px
            cursor: pointer
            &:hover
                color: #fd6363
</style>