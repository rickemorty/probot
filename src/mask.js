// directives/mask.js
export default {
    mounted(el, binding) {
        const maskType = binding.value

        function format(value) {
            value = value.replace(/\D/g, '')

            switch (maskType) {
                case 'phone':
                    if (value.length > 11) value = value.slice(0, 11)
                    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
                    value = value.replace(/(\d{5})(\d)/, '$1-$2')
                    break

                case 'cpf':
                    value = value.slice(0, 11)
                    value = value.replace(/(\d{3})(\d)/, '$1.$2')
                    value = value.replace(/(\d{3})(\d)/, '$1.$2')
                    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                    break

                case 'cnpj':
                    value = value.slice(0, 14)
                    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
                    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
                    value = value.replace(/(\d{4})(\d)/, '$1-$2')
                    break

                case 'cep':
                    value = value.slice(0, 8)
                    value = value.replace(/(\d{5})(\d)/, '$1-$2')
                    break

                case 'preco':
                    const number = parseInt(value, 10)
                    value = (number / 100).toFixed(2) // divide por 100 e fixa 2 casas
                    value = value.replace('.', ',')   // troca ponto por vírgula
                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') // milhar
                    break
            }

            return value
        }


        function updateValue(e) {
            const oldValue = e.target.value
            const formatted = format(oldValue)

            // Só atualiza se for diferente (evita loop)
            if (formatted !== oldValue) {
                e.target.value = formatted
                // Atualiza v-model no Vue
                e.target.dispatchEvent(new Event('input', { bubbles: true }))
            }
        }

        el.addEventListener('input', updateValue)
    }
}
