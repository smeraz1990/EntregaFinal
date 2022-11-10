function Init()
{
    $(document).on("click","#btnPedido",SolicitarPedido)
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

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}


