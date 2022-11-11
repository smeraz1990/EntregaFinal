function Init()
{
    $(document).on("click",".btnAddProduct",AgregarProductoCarrito)
    $(document).on("click",".btnDetailProduct",DetalleProducto)
    $(document).on("change","#cbxCategory",CargarCategoria)
}
function AgregarProductoCarrito(){
    const Productoid = $(this).data("productoid")
    $.ajax({
    method: "GET",
    url: "/carrito/6368743b218a3a70e53bc918/"+Productoid,
    data: {},
    success: function (result) {
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
    window.location.href = "Product/categoria/"+$(this).val()
}