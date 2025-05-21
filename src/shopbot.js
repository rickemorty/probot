
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

function UID(length = 24) {
    let chars = "abcdef0123456789";
    let r = "";
    while (length > 0) {
        r += chars.charAt(Math.floor(Math.random() * chars.length));
        length--;
    }
    return r;
}

let local = localStorage.getItem('probox')
if (!local) window.app = {
    client: UID(), step: 0, name: 'Claudia', title: 'Claudia', avatar: 'https://probox.app/probox.svg', style: '--main:rgb(141, 0, 252);--green:#00FF7F;--text:#222;--border:#ddd;--background:#f1f1f1;--white:white;--yellow:#f5ec71',
    bot: [{ m: ['Olá, seja bem vindo(a) à <b>Probox</b>.<br />Sua assistente virtual de neǵocios desenvolvida utilizando Inteligência Artificial.', 'Qual é o nome da sua <b>Assistente</b>?'], cb: (m) => { app.id = m.trim().toLowerCase(); ws.send(JSON.stringify({ id: app.id, start: true, client: app.client })) } }]
}
else window.app = JSON.parse(local)

const P = (p, i) => `<img src="${p.pic[0].src}" alt="${p.name}" />
<div class="name">${p.name}</div>
<div class="desc">${p.desc}</div>
<div class="add">
<div class="price"><span>R$</span><br>${money(p.price)}</div>
<input onchange='update(${JSON.stringify(p)},event.target.value)' class="qtd" type="number" min="0" max="99" value="${p.qtd || 0}" />
</div>`

// BODY
var loader = z({ c: 'load', h: '<div class="inner" />' })
var html = z({ c: "shopbot" })
/* html.style.display = "none"; */
// HEAD
var head = z({ c: "head" })
var logo = z({ d: "img", c: "logo" })
var title = z({ c: "title" })
var full = z({ d: 'i', c: 'fullicon fa-solid fa-times', t: 'TELA CHEIA', ck: () => html.classList.contains('full') ? (html.classList.remove('full'), full.classList.remove('fa-times'), full.classList.add('fa-up-right-and-down-left-from-center')) : (html.classList.add('full'), full.classList.add('fa-times'), full.classList.remove('fa-up-right-and-down-left-from-center')) })
// CART
var cart = z({ c: 'cart', t: "Sacola", h: `<i class="fa-solid fa-bag-shopping"></i><b>0</b>` });
// CHAT
var chat = z({ c: "chat", h: '<div class="write" />' });
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
        let m = input.value
        chat.update({ n: app.client, m: m })
        if (app.bot[app.step].cb) app.bot[app.step].cb(m)
        input.value = ""
    }
})
var write = z({ c: 'write h' })
var text = z({ c: "text" })
text.append(input)
text.append(bsend)
text.append(write)

var add = z({ d: "button", c: "button", h: `ADICIONAR` })

var buttons = z({ c: "buttons" })
buttons.update = (options, cb) => {
    buttons.h("")
    options.map(option => {
        let bt = z({
            c: "button", h: option.name, ck: async () => {
                bt.disabled = true;
                message(option.name, app.client);
                if (cb) await cb(option);
                bt.disabled = false;
            }
        })
        buttons.append(bt)
    })
}

// FUNCTIONS
const money = (v) => parseFloat(v).toFixed(2);
const tp = (m) => m.replace(/\n/g, '<br/>').replace('%nome', app.nome || '')

const message = (msg, user) => {
    chat.h(`<div class="msg ${user && user == app.client ? 'right' : 'left'}"><div class="n">${!user ? app.name : (user == app.client ? 'Você' : user)}</div>${tp(msg)}</div>`, true)
    chat.scrollTo(0, 10000);
    input.value = ""
}

const control = (e) => {
    if (footer.contains(text)) footer.removeChild(text)
    if (footer.contains(add)) footer.removeChild(add)
    if (footer.contains(buttons)) footer.removeChild(buttons)
    footer.append(e)
    input.focus()
}

const next = () => { if (app.bot[++app.step]) chat.update(app.bot[app.step]) }
const restart = () => {
    app.step = 0
    chat.update(app.bot[app.step])
}

chat.update = (msg) => {

    if (msg.m) {
        if (typeof msg.m === 'string') msg.m = [msg.m]
        msg.m.map(mg => message(mg, msg.n))
    }

    if (msg.type == "products") {
        console.log(msg.options);
        let products = z({ c: "products" })
        msg.options.map((p, i) => products.append(z({ c: "product", h: P(p, i) })))
        control(add)
        chat.append(products)
        chat.scrollTo(0, 10000);
        return
    }

    if (msg.type == "buttons") {
        buttons.update(msg.options, msg.cb)
        control(buttons)
        chat.scrollTo(0, 10000);
        return
    }

    input.pattern = ""
    if (msg.pattern) input.pattern = msg.pattern
    control(text)
    //localStorage.setItem('chat', chat.innerHTML)
}

function load(ID) {

    document.head.innerHTML += `<style>:root {${app.style}}</style>`;
    logo.src = app.avatar;
    avatar.h(`<i class="fa fa-chevron-down" title="FECHAR"></i> <b>Oi</b> <img src="${app.avatar}" />`).src = app.avatar;
    if (app.title) title.h(app.title)
    console.log(app);
    add.onclick = app.bot[app.step].cb

    if (app.cart) {
        cart.update = (p, v) => {

            if (app.cart.products.length)
                app.cart.products = app.cart.products.filter(pr => pr.name != p.name)
            if (v > 0) {
                p.qtd = parseInt(v)
                app.cart.products.push(p)
            }
            app.cart.total = 0
            let items = 0
            app.cart.products.map(o => {
                app.cart.total += o.qtd * parseFloat(o.price)
                items = items + o.qtd
            })

            cart.h(`<i class="fa-solid fa-bag-shopping"></i><b>${items}</b>`);
        }

        cart.onclick = () => {
            let carts = z({ c: "products" });
            app.cart.products.map(p => carts.append(z({ c: "product", h: P(p, p.i) })))
            if (app.cart.total > 0) message("Estes são os itens em sua sacola.")
            else message("Sua sacola está vazia.")
            chat.append(carts)
            if (app.cart.total > 0) {
                if (app.cart.delivery)
                    message(`<b>Taxa de entrega:</b> R$ ${app.cart.delivery.toFixed(2)}`)
                message(`<b>Total:</b> R$ ${(parseFloat(app.cart.delivery) + parseFloat(app.cart.total)).toFixed(2)}`)
            }
            chat.scrollTo(0, 10000);
        }
        window.update = cart.update
    }

    // LAYOUT
    head.append(logo)
    head.append(title)
    head.append(full)
    if (app.cart) head.append(cart)
    html.innerHTML = ""
    html.append(head)
    html.append(chat)
    html.append(footer)
    html.append(avatar)
    if (ID) document.querySelector(ID).append(html)
    else document.body.append(html)

    chat.innerHTML = localStorage.getItem('chat')
    chat.update(app.bot[app.step])

    html.style.display = 'flex'
}

var ws;
var probox = ({ key, mount = false, open, dev }) => {
    let css = dev ? "src/style.sass" : "https://probox.app/shopbot/probox.css"
    document.head.innerHTML += `<link rel="stylesheet" href="${css}" type="text/css" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />`
    //ws = new WebSocket('wss://ws.probox.app')
    ws = new WebSocket('ws://localhost:3000')
    if (open) html.classList.add('open', 'full')
    html.append(loader)
    if (mount) document.querySelector(mount).append(html)
    else document.body.append(html)

    const send = (d) => {
        if (ws.readyState == WebSocket.CLOSED) {
            window.probox({ key: key, mount: mount, open: open })
            setTimeout(() => send(d), 2000)
            return
        }
        ws.send(JSON.stringify({ id: app.id, client: app.client, ...d }))
    }

    ws.onmessage = ({ data }) => {
        var m = JSON.parse(data)
        console.log(m);
        write.classList.remove('h')
        bsend.classList.add('h')
        head.classList.add('talk')
        setTimeout(() => {
            if (m.bot) {
                m.bot.map((s, i) => s.cb && (m.bot[i].cb = eval(s.cb)))
                app = { ...app, ...m }
                load(mount)
            }
            if (m.m) chat.update(m)
            if (m.u) app = { ...app, ...m.u }
            if (m.n) next()
            if (m.s > -1) (app.step = m.s, chat.update(app.bot[app.step]))

            if (m.pay) message(`<i class="fa fa-check" /> PAGAMENTO CONFIRMADO.`);
            write.classList.add('h')
            bsend.classList.remove('h')
            head.classList.remove('talk')
        }, 1000)
    }

    ws.onopen = () => {
        if (!key) load(mount)
        else {
            app.id = key
            send({ start: true })
        }
    }

    /* ws.onclose = () => send({ bye: true }) */
}
//probox({ key: "67d04921a77725eb124ee2bf-b", open: true, dev: true })
//probox({ key: "655f5b7224009e22a413bbfa", dev: true })
probox({ dev: true, open: true })