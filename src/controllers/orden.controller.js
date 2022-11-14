//import logger from '../src/winstonconfig.js';
import carritoService from "../service/carrito.service.js";
import ordenService from "../service/orden.service.js";
import HerramientasEnvios from '../components/EmailConfig.js'


const createOrden = async(req, res)=>{
/*     const from ='Server Node.js'
    const usuarioid = req.user._id.toString()
    const subject = `Nuevo pedido de: ${req.user.nombre} correo: ${req.user.username}`
    const to = req.user.username */
    //const ordenCrated = await ordenService.createOrden()
    const from ='Server Node.js'
    const {idusuario} = req.body
    const subject = `Nuevo pedido de: Saymon correo: smeraz@genomi-k.com`
    const to = 'smeraz@genomi-k.com'
    let htmlTable = ''
    let TotalCompra = 0
    let TotalArticulos = 0
    const responseProductos = await carritoService.getCarritoProductByFilters({usuarioid:idusuario})
    const arrayProductos = responseProductos
    const createToOrden = {
        usuarioid: idusuario,
        productos: arrayProductos
    }
    const ordenCrated = await ordenService.createOrden(createToOrden)
    //console.log(ordenCrated.usuarioid)
    htmlTable = `<h2>Numero de Orden: <strong>${ordenCrated.id}</strong></h2>
                <table id="gridProductosList" border = "1" style="width: 100%;">
                    <thead class="thead-dark">
                        <th scope="col" align="left">Titulo</th>
                        <th scope="col" align="center">Precio</th>
                        <th scope="col" align="center">cantidad</th>
                    </thead>
                    <tbody>`
    for(let i = 0; i < arrayProductos.length; i++)
    {
        TotalCompra+= TotalCompra + (arrayProductos[i].price * arrayProductos[i].qry)
        TotalArticulos+= TotalArticulos + arrayProductos[i].qry
        htmlTable+= `<tr>
                        <td align="left">${arrayProductos[i].name}</td>
                        <td align="center">${arrayProductos[i].price}</td>
                        <td align="center">${arrayProductos[i].qry}</td>
                    </tr>`
    }
    htmlTable += `</tbody>
                </table>`

    const mailOptions = {
        from,
        to,
        subject,
        html: htmlTable
    }

    //console.log(req.user)

   /*  const whatsOption = { 
        body: subject, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:${req.user.telefono}`
    } */
    HerramientasEnvios.EnvioCorreo(mailOptions)
    //HerramientasEnvios.EnvioWhats(whatsOption)
    res.json({mensaje: "Correo Enviado"})

    //console.log("datos a usar para el correo:", mailOptions)
}
const datosOrden = async(req, res)=>{
        const { idusuario } = req.params
        let filters = { usuarioid: idusuario };
        const responseProductos = await carritoService.getCarritoProductByFilters(filters)
        const arrayProductos = responseProductos

        let ContadorProductos = 0
        for(let i=0; i < arrayProductos.length; i++)
        {
          ContadorProductos += arrayProductos[i].qry
        }
        res.json({numeroProductos: ContadorProductos});
    
        //console.log("datos a usar para el correo:", mailOptions)
    }
export default {
    createOrden,
    datosOrden
}