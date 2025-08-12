import { createApp } from 'vue'
import App from './App.vue'
import Mask from './mask'
document.body.innerHTML += '<div id="shopbot"></div>'
document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />`
let app = createApp(App)
app.directive('mask', Mask)
app.mount('#shopbot')




