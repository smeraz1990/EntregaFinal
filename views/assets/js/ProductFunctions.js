function Init()
{
    $(document).on("click",".btnAddProduct",AgregarProductoCarrito)
    $(document).on("click",".btnDetailProduct",DetalleProducto)
    $(document).on("change","#cbxCategory",CargarCategoria)
    detalleOrden()
}
function AgregarProductoCarrito(){
    const UsuarioLog = $('#inpUserLog').val()
    const Productoid = $(this).data("productoid")
    $.ajax({
    method: "GET",
    url: "/carrito/"+UsuarioLog+"/"+Productoid,
    data: {},
    success: function (result) {
        $('#inpNumeroProductos').html(result.numeroProductos)
        //console.log(result);
    },
    dataType: "json"
    });  
}

function DetalleProducto(){
    const Productoid = $(this).data("productoid")
    $.ajax({
    method: "GET",
    url: "/product/"+Productoid,
    data: {},
    success: function (result) {
        //console.log(result);
    },
    dataType: "json"
    });  
}

function CargarCategoria(){
    let variablerutas = ''
        var x = window.location.pathname.split("/").length
        console.log(x)
        if (x > 2){
             for (let i = 2; i < x; i++)
             {
                variablerutas += '../'
             }
        }
        let ruta = variablerutas+"Product/categoria/"+$(this).val()
    window.location.href = ruta
}