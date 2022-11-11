function Init()
{
    $(document).on("click",".btnAddProduct",AgregarProductoCariito)
}
function AgregarProductoCariito(){
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