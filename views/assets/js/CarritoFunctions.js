function Init()
{
    $(document).on("click","#btnPedido",SolicitarPedido)
    $(document).on("click",".btnDeleteProduct",DeleteProduct)


    
    detalleOrden()
}
function SolicitarPedido(){
let numeroproductos = gridProductosCarrito.rows.length
    if(numeroproductos <= 1)
    {
    alert("Debe tener por lo menos un producto en carrito")
    return
    }
    $.ajax({
    method: "post",
    url: "/orden",
    data: JSON.stringify({
        "idusuario":'6368743b218a3a70e53bc918'
    }),
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function (result) {
        window.onload = timedRefresh(2000);
    },
    });
}

function DeleteProduct(){
    const UsuarioLog = $('#inpUserLog').val()
    const Productoid = $(this).data("productoid")
    $.ajax({
        method: "delete",
        url: "/carrito/"+UsuarioLog+"/"+Productoid,
        data: JSON.stringify({
        }),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (result) {
            window.onload = timedRefresh(1000);
        },
    });

}

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}


