$(document).ready(function () {

    var image = document.getElementById("sample-image");
    var originalImage;
    var cropper;

    $("#upload_image").change(function () {
        var files = event.target.files;

        var done = function (url) {
            image.src = url;
            $('.display-image, .choose-image, .crop-display-image').toggleClass('active');

            //sets the properties of the cropper
            cropper = new Cropper(image, {
                aspectRatio: 330 / 440,
                viewMode: 0,
                zoomOnWheel: true,
                toggleDragModeOnDblclick: true,
                responsive: true,
                preview: '.crop-image-preview',

            })
            $('#cropper-reset').click(function () {
                cropper.reset();
            })
            $('#cropper-disable').click(function () {
                cropper.disable();
            })
            $('#cropper-enable').click(function () {
                cropper.enable();
            })
        }
        if (files && files.length > 0) {
            reader = new FileReader();
            reader.onload = function (event) {
                done(reader.result);
                originalImage = reader.result;
            };
            reader.readAsDataURL(files[0]);
        }
        //send image to server as base64 string when crop button is clicked 
        $('#create').click(function () {

            event.preventDefault();
            // var $form = $(this),
            // url = $form.attr('action');
            canvas = cropper.getCroppedCanvas({
                width: 400,
                height: 400
            });

            canvas.toBlob(function (blob) {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function () {
                    console.log(reader.result);
                    console.log(originalImage);

                    var formData = new FormData();
                    formData.append('fname', $("#fname").val());
                    formData.append('lname', $("#lname").val());
                    formData.append('etime', $("#etime").val());
                    formData.append('elink', $("#elink").val());
                    formData.append('edesc', $("#edesc").val());
                    formData.append('croppedImage', reader.result);
                    formData.append('originalImage', originalImage);



                    $.ajax('/users', {
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function () {
                            console.log('Upload success');
                        },
                        error: function () {
                            console.log('Upload error');
                        }
                    });
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            });

        });
    });
})
