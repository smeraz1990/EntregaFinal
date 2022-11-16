const socket = io()
const ProductosForm = document.querySelector('#ProductosForm')
const titleInput = document.querySelector('#title')
const priceInput = document.querySelector('#price')
const imgPool = document.querySelector('#thumbnail')

//Datos para mensajeria
const messageForm = document.querySelector('#messageForm')
const emailInput = document.querySelector('#emailInput')
const nombreInput = document.querySelector('#nombreInput')
const apellidoInput = document.querySelector('#apellidoInput')
const edadInput = document.querySelector('#edadInput')
const aliasInput = document.querySelector('#aliasInput')
const avatarInput = document.querySelector('#avatarInput')
const messageInput = document.querySelector('#messageInput')
let entendimiento=0

if(messageForm){
    function sendProductos(productInfo) {
        socket.emit('client:product', productInfo)
    }

    //Funciones para mensajeria
    function sendMessage(messageInfo) {
        socket.emit('client:menssage', messageInfo)
    }

    function renderMessage(messagesInfo) {
        //console.log("aqui los datos",messagesInfo)
    
        fetch('./messagesPool.hbs').then(response => {
            response.text().then((plantillamensajes) => {
                const template = Handlebars.compile(plantillamensajes);
                let html = template({ messagesInfo});
                //console.log(html)
                $("#divChats").html(html)
                if(messageForm){
                var objDiv = document.getElementById("divChats");
                objDiv.scrollTop = objDiv.scrollHeight;
                }
            })
        })
    }

        messageForm.addEventListener('submit', event => {
            event.preventDefault()
            if (messageInput.value == "") {
                alert('Ingresar un mensaje.')
                return
            }

            const now = new Date()
            const fecha = now.toLocaleDateString("es-MX")
            const horas = (" " +
                    ("0" + now.getHours()).slice(-2) + ":" +
                    ("0" + now.getMinutes()).slice(-2) + ":" +
                    ("0" + now.getSeconds()).slice(-2))
                //console.log(now.toLocaleDateString("es-MX"));
                //console.log(horas);

            const messageInfo = {
                    username: emailInput.value,
                    nombre: nombreInput.value,
                    avatar: avatarInput.value,
                    horaenvio: fecha + horas,
                    txtmensje: messageInput.value
                }
                //console.log(messageInfo)
            sendMessage(messageInfo)
            messageInput.value = ""
        })

    socket.on('server:mensajes', renderMessage)
    //renderProductos({ title: "Nuevo Titulo", price: "50.2", thumbnail: "nueva imagen" })
}

