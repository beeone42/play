
$(document).ready(function(){
    $("#btn_slave").click(function(){
	//alert($("#slave_id").val());
	if ($("#slave_id").val() != "")
	    window.location.href = "/slave/#" + $("#slave_id").val();
    });
});
