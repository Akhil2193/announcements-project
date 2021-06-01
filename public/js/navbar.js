$("#hamburger").click(function () {
    if ($(".navbar,.navbar-list,.navbar-items, .content, #myVideo, #intro-page, .head-content").hasClass("active")) {
        $(".navbar,.navbar-list,.navbar-items, .content, #myVideo, #intro-page, .head-content").removeClass("active");
    }

    else {
        $(".navbar,.navbar-list,.navbar-items, .content, #myVideo, #intro-page, .head-content").addClass("active");
    }

    $(".hamburger-line1").toggleClass("is-active");

});