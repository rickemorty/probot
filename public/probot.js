var app = {
    cart: { id: "", phone: "", name: "", email: "", cpf: "", total: 0, date: new Date(), address: "", delivery: "", payway: "", products: [], subscription: {} },
    step: 1
}

// CART
var cart = document.createElement("div");
cart.className = "cart";
cart.title = "Sacola";
cart.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>0`

// CHAT
var chat = document.createElement("div");
chat.className = "chat";
chat.list = []

// BODY
var html = document.createElement("div");
html.className = "probot";

// HEAD
var head = document.createElement("div");
head.className = "head";
var logo = document.createElement("img");
logo.className = "logo";
var title = document.createElement("div");
title.className = "title";

var total = document.createElement("div");
total.className = "total";
total.update = () => total.innerHTML = `<label>Total <span>(R$)</span></label><br/>${money(app.cart.total)}`;

// FOOTER
var footer = document.createElement("div");
footer.className = "footer";

// CONTROLS
var input = document.createElement("input");
input.className = "input";
input.id = "inputMessage"
input.placeholder = "Mensagem";
input.onkeyup = (e) => {
    if (e.keyCode === 13) send.click()
}

var send = document.createElement("div");
send.innerHTML = `<i class="fa fa-paper-plane" />`
send.className = "send";
send.title = "Enviar";
send.onclick = () => {
    chat.update({ user: true, msg: input.value })
    if (app.bot[app.step].cb) app.bot[app.step].cb(input.value)
    input.value = ""
}

var text = document.createElement("div");
text.className = "text";
text.append(input)
text.append(send)

var add = document.createElement("button")
add.className = "button"
add.innerHTML = `<i class="fa fa-thumbs-up" />  Continuar`


var buttons = document.createElement("div")
buttons.className = "buttons"
buttons.update = (options, cb) => {
    buttons.innerHTML = ""
    options.map(option => {
        let bt = document.createElement("button")
        bt.className = "button"
        bt.innerHTML = option.name
        bt.onclick = () => { message(option.name, true); cb(option) }
        buttons.append(bt)
    })
}

// FUNCTIONS
const money = (v) => parseFloat(v).toFixed(2);
const show = (item) => setTimeout(() => item.className = item.className.replace("opacity", ""), 80)
const message = (msg, user) => {
    let i = chat.list.length
    chat.list.push(document.createElement('div'))
    chat.list[i].className = "msg opacity "
    chat.list[i].className += user ? "right" : "left";
    chat.list[i].innerHTML = msg
    chat.append(chat.list[i])
    chat.scrollTo(0, 10000);
    show(chat.list[i])
}
const control = (e) => {
    if (footer.contains(text))
        footer.removeChild(text)
    if (footer.contains(add))
        footer.removeChild(add)
    if (footer.contains(buttons))
        footer.removeChild(buttons)
    e.className += ' opacity'
    footer.append(e)
    show(e)
    input.focus()
}
const next = () => chat.update(app.bot[++app.step])

async function sw() {

    if (Notification.permission === "granted") {
        if ('serviceWorker' in navigator) {

            const register = await navigator.serviceWorker.register('sw.js', { scope: '/' });

            const broadcast = new BroadcastChannel('channel');
            // ENVIAR MSG para SW =  
            //broadcast.postMessage({ id: "123"});

            /* broadcast.onmessage = async (data) => {
                console.log(data);

                if (data.make) {

                }
            } */

            const publicVapidKey = 'BJ011p7GYL1alG6DAVkCoTuVPHfAGKD0l2sBq0HXfQ8zDOOAWXbgJC8lUJM7OuzsTjxszZlW5hFT0COV4NqcOdU';

            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicVapidKey,
            });

            app.cart.subscription = subscription
        }
        else {
            alert("A versão do seu navegador não é compatível, troque ou atualize seu navegador e tente novamente.")
        }
    } else {
        alert('Permita as notificações para que possa receber atualizações sobre o seu pedido em tempo real.')
        Notification.requestPermission()
    }
}

function loadProbot() {

    // CSS
    document.head.innerHTML += `<style>:root { --main: ${app.theme};--green: #00FF7F;--text: #222;--border: #ddd;--background: #f1f1f1;--white: white;}</style><link rel="stylesheet" href="${app.css}" type="text/css"/><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />`;

    logo.src = app.logo;
    title.innerHTML = app.restaurant
    total.update()
    add.onclick = app.bot[app.step].cb
    cart.update = (s, i, v) => {
        if (s, i, v) {
            if (app.cart.products.length)
                app.cart.products = app.cart.products.filter(p => p.name != app.bot[s].options[i].name)
            app.bot[s].options[i].qtd = parseInt(v)
            app.bot[s].options[i].i = i
            app.bot[s].options[i].s = s
            app.cart.products.push(app.bot[s].options[i])
        }
        app.cart.total = 0
        items = 0
        app.cart.products.map(o => {
            app.cart.total += o.qtd * o.price
            items = items + o.qtd
        })

        cart.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>${items}`;
        total.update()
    }
    cart.onclick = () => {
        let carts = document.createElement("div");
        carts.className = "products opacity"
        app.cart.products.map((p, i) => {
            let product = document.createElement("div");
            product.className = "product"
            product.innerHTML += `
                    <input onchange="cart.update(${p.s},${p.i},event.target.value)" class="qtd" type="number" min="0" max="99" value="${p.qtd}" />
                    <img src="${p.pic}" alt="${p.name}" />
                    <div class="name">${p.name}</div>
                    <div class="desc">${p.desc}</div>
                    <div class="price"><span>R$</span> ${money(p.price)}</div>
                `
            carts.append(product)
        })
        if (app.cart.total > 0)
            message("Estes sãos os itens em sua sacola.")
        else
            message("Sua sacola está vazia.")
        chat.append(carts)
        show(carts)

        chat.scrollTo(0, 10000);
    }
    chat.update = (item) => {

        if (typeof item.msg === 'string') item.msg = [item.msg]

        item.msg.map(msg => message(msg, item.user || false))

        if (item.type == "products") {
            let products = document.createElement("div");
            products.className = "products opacity"
            item.options.map((p, i) => {
                let product = document.createElement("div");
                product.className = "product"
                product.innerHTML += `
                    <input onchange="cart.update(${app.step},${i},event.target.value)" class="qtd" type="number" min="0" max="99" value="${p.qtd}" />
                    <img src="${p.pic}" alt="${p.name}" />
                    <div class="name">${p.name}</div>
                    <div class="desc">${p.desc}</div>
                    <div class="price"><span>R$</span> ${money(p.price)}</div>
                `
                products.append(product)
            })

            control(add)
            chat.append(products)
            show(products)
            chat.scrollTo(0, 10000);
            return
        }

        if (item.type == "buttons") {
            buttons.update(item.options, item.cb)
            control(buttons)
            chat.scrollTo(0, 10000);
            return
        }

        input.pattern = ""
        if (item.pattern) input.pattern = item.pattern
        control(text)
    }

    // LAYOUT
    head.append(logo)
    head.append(title)
    head.append(total)
    head.append(cart)

    html.append(head)
    html.append(chat)

    html.append(footer)

    document.body.appendChild(html)
    chat.update(app.bot[app.step])
}

var probot = (ID) => {

    const loader = document.createElement('div')
    loader.className = "loader"

    const ws = new WebSocket('wss://probot.probox.app')
    //const ws = new WebSocket('ws://localhost:8080')
    ws.onmessage = ({ data }) => {

        var sm = JSON.parse(data)
        console.log(sm);

        if (sm.client) {
            if (sm.api.pix) sm.api.pix = eval(sm.api.pix)
            sm.bot.map((m, i) => {
                if (m.cb) sm.bot[i].cb = eval(sm.bot[i].cb)
            })
            app.cart.client = sm.client
            app = { ...app, ...sm }
            loadProbot()
        }
    }

    ws.onopen = () => {
        app.id = ID
        ws.send(JSON.stringify({ id: ID }))
    }
}
