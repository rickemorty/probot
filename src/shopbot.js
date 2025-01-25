import './style.sass'

let C = localStorage.getItem('probox')
if (!C) {
    C = Math.floor(Date.now() / 1000).toString(16)
    localStorage.setItem('probox', C)
}
var app = { step: 1, client: C }

const z = ({ d, id, c, t, ck, h, p }) => {
    let e = document.createElement(d || "div")
    if (id) e.id = id
    if (t) e.title = t
    if (ck) e.onclick = ck
    if (c) e.className = c
    if (h) e.innerHTML = h
    if (p) e.placeholder = p
    e.h = (h = '', p) => {
        if (p) e.innerHTML += h
        else e.innerHTML = h
        return e
    }
    return e
}

const P = (p, i) => `<input onchange="probox.update(${p.s || app.step},${i},event.target.value)" class="qtd" type="number" min="0" max="99" value="${p.qtd}" />
                    <img src="${p.pic}" alt="${p.name}" />
                    <div class="name">${p.name}</div>
                    <div class="desc">${p.desc}</div>
                    <div class="price"><span>R$</span> ${money(p.price)}</div>`

// BODY
var html = z({ c: "shopbot" });

// HEAD
var head = z({ c: "head" })
var logo = z({ d: "img", c: "logo" })
var title = z({ c: "title" })
var full = z({ d: 'i', c: 'fullicon fa-solid fa-up-right-and-down-left-from-center', t: 'TELA CHEIA', ck: () => html.classList.contains('full') ? html.classList.remove('full') : html.classList.add('full') })
// CART
var cart = z({ c: 'cart', t: "Sacola", h: `<i class="fa-solid fa-bag-shopping"></i><b>0</b>` });
// CHAT
var chat = z({ c: "chat" });
chat.list = []
// FOOTER
var footer = z({ c: "footer" })
var avatar = z({ c: "avatar", ck: () => (html.classList.contains('open') ? document.querySelector('.shopbot').classList.remove('open') : document.querySelector('.shopbot').classList.add('open'), document.querySelector('.shopbot').classList.remove('full')) })
// CONTROLS
var input = z({ d: "textarea", id: "inputMessage", c: "input", p: "Mensagem" })
/* input.onkeyup = (e) => e.keyCode === 13 ? send.click() : false */

var bsend = z({
    c: "send", h: `<i class="fa fa-paper-plane" />`, t: "Enviar",
    ck: () => {
        chat.update({ user: true, msg: input.value })
        if (app.bot[app.step].cb) app.bot[app.step].cb(input.value)
        input.value = ""
    }
})

var text = z({ c: "text" });
text.append(input)
text.append(bsend)

var add = z({ d: "button", c: "button", h: `ADICIONAR` })

var buttons = z({ c: "buttons" })
buttons.update = (options, cb) => {
    buttons.h("")
    options.map(option => {
        let bt = z({
            c: "button", h: option.name, ck: async () => {
                bt.disabled = true;
                message(option.name, true);
                if (cb) await cb(option);
                bt.disabled = false;
            }
        })
        buttons.append(bt)
    })
}

// FUNCTIONS
const money = (v) => parseFloat(v).toFixed(2);
const show = (item) => setTimeout(() => item.className = item.className.replace("opacity", ""), 80)
const message = (msg, user) => {
    let i = chat.list.length
    chat.list.push(z({ h: msg, c: `msg opacity ${user ? "right" : "left"}` }))
    chat.append(chat.list[i])
    chat.scrollTo(0, 10000);
    show(chat.list[i])
}
const control = (e) => {
    if (footer.contains(text)) footer.removeChild(text)
    if (footer.contains(add)) footer.removeChild(add)
    if (footer.contains(buttons)) footer.removeChild(buttons)
    e.className += ' opacity'
    footer.append(e)
    show(e)
    input.focus()
}

const next = () => { if (app.bot[++app.step]) chat.update(app.bot[app.step]) }
const restart = () => {
    app.step = 1
    chat.update(app.bot[app.step])
}

function load(ID) {

    // CSS
    document.head.innerHTML += `<style>:root { --main:#00f0ff;--green:#00FF7F;--text:#222;--border:#ddd;--background:#f1f1f1;--white:white;--yellow:#f5ec71}</style>${app.css ? `<link rel="stylesheet" href="${app.css}" type="text/css"/>` : ''}<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />`;

    logo.src = app.avatar;
    avatar.h(`<i class="fa fa-chevron-down" title="FECHAR"></i> <b>Oi</b> <img src="${app.avatar}" />`).src = app.avatar;
    title.h(app.name)
    add.onclick = app.bot[app.step].cb

    if (app.cart) {
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
            let items = 0
            app.cart.products.map(o => {
                app.cart.total += o.qtd * o.price
                items = items + o.qtd
            })

            cart.h(`<i class="fa-solid fa-bag-shopping"></i><b>${items}</b>`);
        }
        cart.onclick = () => {
            let carts = z({ c: "products opacity" });
            app.cart.products.map(p => carts.append(z({ c: "product", h: P(p, p.i) })))
            if (app.cart.total > 0) message("Estes são os itens em sua sacola.")
            else message("Sua sacola está vazia.")
            chat.append(carts)
            show(carts)
            chat.scrollTo(0, 10000);
        }
    }
    window.probox = { update: cart.update }
    chat.update = (item) => {

        if (item.msg) {
            if (typeof item.msg === 'string') item.msg = [item.msg]
            item.msg.map(msg => message(msg, item.user || false))
        }

        if (item.type == "products") {
            let products = z({ c: "products opacity" })
            item.options.map((p, i) => products.append(z({ c: "product", h: P(p, i) })))
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
    head.append(full)
    if (app.cart) head.append(cart)
    html.append(head)
    html.append(chat)
    html.append(footer)
    html.append(avatar)
    if (ID) document.querySelector(ID).append(html)
    else document.body.append(html)
    chat.update(app.bot[app.step])
}

var ws;
var shopbot = (ID, a) => {
    //const ws = new WebSocket('wss://probot.probox.app')
    ws = new WebSocket('ws://localhost:8080')

    const send = (d) => {
        if (ws.readyState == WebSocket.CLOSED) {
            shopbot(ID, a)
            setTimeout(() => send(d), 2000)
            return
        }
        ws.send(JSON.stringify({ id: app.id, client: app.client, ...d }))
    }
    ws.onmessage = ({ data }) => {
        var m = JSON.parse(data)
        console.log(m);
        if (m.bot) {
            if (m.api && m.api.pix) m.api.pix = eval(m.api.pix)
            m.bot.map((s, i) => s.cb && (m.bot[i].cb = eval(s.cb)))
            app = { ...app, ...m }
            load(a)
        }
        if (m.m) chat.update({ msg: m.m })

        if (m.pay) message(`<i class="fa fa-check" /> PAGAMENTO CONFIRMADO.`);
    }

    ws.onopen = () => {
        if (!app.bot) {
            app.id = ID
            send({ start: true })
        }
    }

    /* ws.onclose = () => send({ bye: true }) */
}

shopbot('655f7beb24009e22a413bd6e', '#app')

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
