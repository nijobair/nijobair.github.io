/*
------------------------------------------------------------
Post Filter:
------------------------------------------------------------
*/
$(document).ready(function () {
    $(".other-categories").click(function () {
        const value = $(this).attr("filter");
        if (value == "all") {
            $(".post-item").show("1000");
        } else {
            $(".post-item").not("." + value).hide("1000");
            $(".post-item").filter("." + value).show("1000");
        }
    });
    // add active class on selected item
    $(".other-categories").click(function () {
        $(this).addClass("selected-category").siblings().removeClass("selected-category");
    });
});