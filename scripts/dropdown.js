$(function(){

	$("#dropdownMenuLink").next("div").hide();

    // subscribe img hover for accordian effect
    $(document).on("click", "#dropdownMenuLink", function(e) {
        let div = $(this).next("div");
        div.slideDown();        
    });

    $(document).on("mouseleave", ".dropdown", function(e) {
        $("#dropdownMenuLink").next("div").hide();    
    });
});