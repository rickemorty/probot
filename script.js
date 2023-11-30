// VARS
let css = 'style.css';
var step = 1

let img = {
    avatar: "img/avatar.svg",
    send: "img/send.svg",
    cart: "img/cart.svg",
    continue: "img/continue.svg",
}

let api = {
    pix: { type: "get", url: "https://api.probox.app/pix" },
    card: { url: "" }
}

// FUNCTIONS
const ID = (id) => app.id = id
const next = () => chat.update(app.bot[++step])
const money = (v) => parseFloat(v).toFixed(2);
const qtd = (e, s, i) => {
    let v = e.target.value
    app.bot[s].options[i].qtd = v
    cart.update()
}
const message = (msg, user) => {
    let i = chat.list.length
    chat.list.push(document.createElement('div'))
    chat.list[i].className = user ? "msg right" : "msg left";
    chat.list[i].innerHTML = msg
    chat.append(chat.list[i])
    chat.scrollTo(0, 10000);

}
const control = (e) => {

    if (footer.contains(text))
        footer.removeChild(text)

    if (footer.contains(add))
        footer.removeChild(add)

    if (footer.contains(buttons))
        footer.removeChild(buttons)

    footer.append(e)
}

/* const cart = {
    update: (atr) => app.cart[0] = { ...app.cart[0], ...atr },
    add: (itens) => {
        app.cart[0].products = [...app.cart[0].products, ...itens]
        chat.update({ msg: "Itens adicionados com sucesso." })
        next()
    }
} */

// APP
const app = {
    restaurant: "<label>PEDIDOS</label><br />BISTRÔ LIMOEIRO", id: true, name: "", email: "", cpf: "",
    bot: [
        { msg: ["Desculpe, não entendi."] },
        {
            type: "products",
            msg: ["Olá eu sou seu assistente de pedidos do <b>Bistrô Limoeiro</b>.<br />O que gostaria de pedir hoje?", "Estes são os nossos produtos, selecione a quantidade que deseja e clique no botão <b>CONTINUAR</b>:"],
            options: [{ qtd: 0, name: "Combo Semanal Simples", desc: "05 Refeições", price: 75.00, pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6gpbBHBIrST9rPeqFLfIRuCjLmbcPQnLe4Lpu8SpDguyqUDPl9SUiKY_FzsbnFGQvVcI&usqp=CAU" },
            { qtd: 0, name: "Combo Semanal Duplo, almoço e janta.", desc: "10 Refeições", price: 125.00, pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrNDBeTmqMFLQleEqsw2j2bj__eU60zz-C-ZhA0UdsrVBHTp0cYfc9hnKuoyM8si34Zs&usqp=CAU" }],
        },
        {
            type: "buttons",
            msg: ["Gostaria de adicionar bebidas ao pedido?"],
            options: [{ name: "Sim", val: true }, { name: "Não", val: false }],
            cb: (opt) => { chat.update({ msg: opt.name, user: app.id }); if (opt.val) { next() } else { step++; next() } }
        }, {
            type: "products",
            msg: ["Escolha as suas bebidas:"],
            options: [{ qtd: 0, name: "Coca-Cola", desc: "Coca 1 Litro", price: 5.00, pic: "https://floripafooddelivery.com.br/wp-content/uploads/2021/04/coca-1-5-l.jpg.webp" },
            { qtd: 0, name: "Guaraná Antártica", desc: "Guaraná Antártica 1 Litro", price: 5.00, pic: "https://redemix.vteximg.com.br/arquivos/ids/211622-1000-1000/7891991008761.jpg?v=638350614941100000" },
            { qtd: 0, name: "Água Mineral Crystal", desc: "Água mineral 500ml", price: 5.00, pic: "https://muffatosupermercados.vteximg.com.br/arquivos/ids/368146-1000-1000/7894900531015.jpg?v=638307505878930000" },
            { qtd: 0, name: "Água Mineral Com Gás", desc: "Água mineral com gás 500ml", price: 5.00, pic: "https://www.imigrantesbebidas.com.br/bebida/images/products/full/2894-agua-mineral-crystal-com-gas-500ml.jpg" }],
        },
        {
            msg: ["Qual o endereço para entrega?"],
            cb: (address) => { cart.atr({ address: address }); next() }
        },
        {
            msg: ["Qual o telefone/Whatsapp de contato?"],
            cb: (wzp) => { ID(wzp); next() }
        },
        {
            type: "buttons",
            msg: ["Qual a forma de pagamento?"],
            options: [{ name: "Pix", val: "pix" }, { name: "Cartão", val: "card" }],
            cb: (opt) => { if (opt.val == "pix") { next() } else { step++; next() } cart.atr({ payway: opt.val }) }
        },
        {
            type: "pix",
            msg: ["Copie o código a baixo para realizar o pagamento via pix."],
            cb: async () => { await fetch(api.pix.url) }
        },
        {
            type: "card",
            msg: ["Acesse o link abaixo para concluir o pagamento.", api.pix.url],
        },
    ],
    cart: [{
        id: "",
        status: "open",
        total: 0.00,
        date: new Date(),
        address: "",
        delivery: new Date(),
        payway: "",
        products: []
    }]
}

// CSS
document.head.innerHTML += `<link rel="stylesheet" href="${css}" type="text/css"/>`;

// BODY
var html = document.createElement("div");
html.className = "foodbot";

// HEAD
var head = document.createElement("div");
head.className = "head";
var avatar = document.createElement("img");
avatar.src = img.avatar;
avatar.className = "avatar";
var title = document.createElement("div");
title.className = "title";
title.innerHTML = app.restaurant

var total = document.createElement("div");
total.className = "total";
total.update = () => total.innerHTML = `<label>Total <span>(R$)</span></label><br/>${money(app.cart[0].total)}`;
total.update(app.cart[0].total)

var cart = document.createElement("div");
cart.className = "cart";
cart.title = "Sacola";
cart.innerHTML = 0
cart.update = () => {
    app.cart[0].total = 0
    app.cart[0].products = []
    let items = 0
    app.bot.map(line => {
        if (line.type == "products") {
            line.options.map(o => {
                if (o.qtd > 0) {
                    app.cart[0].products.push(o)
                    app.cart[0].total += o.qtd * o.price
                    items = parseInt(items) + parseInt(o.qtd)
                }
            })
        }
    })
    cart.innerHTML = items;
    total.update()
}
cart.add = () => {
    cart.update()

    if (app.cart[0].total > 0) next()
    else message("Selecione a quantidade de itens que deseja.")
}
cart.atr = (atr) => app.cart[0] = { ...app.cart[0], ...atr }

// CHAT
var chat = document.createElement("div");
chat.className = "chat";
chat.list = []
chat.update = (item) => {

    if (typeof item.msg === 'string') item.msg = [item.msg]

    item.msg.map(msg => message(msg, item.user || false))

    if (item.type == "products") {
        let products = `<div class="products">`
        item.options.map((p, i) => {
            products += `<div class="product">
                    <input onchange="qtd(event, ${step}, ${i})" class="qtd" type="number" min="0" max="99" value="${p.qtd}" />
                    <img src="${p.pic}" alt="${p.name}" />
                    <div class="name">${p.name}</div>
                    <div class="desc">${p.desc}</div>
                    <div class="price"><span>R$</span> ${money(p.price)}</div>
                </div>`

        })
        products += `</div>`

        chat.innerHTML += products
        control(add)
        chat.scrollTo(0, 10000);
        return
    }

    if (item.type == "buttons") {
        buttons.update(item.options, item.cb)
        control(buttons)
        return
    }

    control(text)
}

// FOOTER
var footer = document.createElement("div");
footer.className = "footer";

// CONTROLS
var input = document.createElement("input");
input.className = "input";
input.placeholder = "Mensagem";
input.onkeyup = (e) => {
    if (e.keyCode === 13) send.click()
}

var send = document.createElement("img");
send.src = img.send;
send.className = "send";
send.title = "Enviar";
send.onclick = () => {
    chat.update({ user: app.id, msg: input.value })
    if (app.bot[step].cb) app.bot[step].cb(input.value)
    input.value = ""
}

var text = document.createElement("div");
text.className = "text";
text.append(input)
text.append(send)

var add = document.createElement("button")
add.className = "button"
add.innerHTML = `<img src="${img.continue}" /> Continuar`
add.onclick = cart.add

var buttons = document.createElement("div")
buttons.className = "buttons"
buttons.update = (options, cb) => {
    buttons.innerHTML = ""
    options.map(option => {
        let bt = document.createElement("button")
        bt.className = "button"
        bt.innerHTML = option.name
        bt.onclick = () => cb(option)
        buttons.append(bt)
    })
}

// LAYOUT
head.append(avatar)
head.append(title)
head.append(total)
head.append(cart)

html.append(head)
html.append(chat)

html.append(footer)

document.body.appendChild(html)
chat.update(app.bot[step])