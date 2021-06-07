var size = parseInt('<%=size%>');
$(document.body).on('click', '.event-description-close', function () {

    console.log("close button was clicked");
    $('.event-card-description-container').css('display', 'none');
    $('.event-card').css('display', 'block');
    for (var i = 0; i < size; i++) {
        $('#' + i.toString() + 'card').css('display', 'block');
    }
})
for (var i = 0; i < size; i++)(function (i) {

    $('#' + i.toString() + 'card').on('click', function () {
        // console.log(`${i} element was clicked`);
        $('.event-card').css('display', 'none');
        $('#' + i.toString() + 'description').css('display', 'flex');
        // console.log("this function on " + id + "was called");
    });
})(i);