(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });

    $(document).ready(function () {
        // Dejar seleccionado el elemento "Desarrollo" por defecto
        $('#portfolio-flters li[data-filter=".dev"]').addClass('active');

        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $('#portfolio-flters li').removeClass('active');
            $(this).addClass('active');
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
            $('.go-to-wsp').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
            $('.go-to-wsp').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // Obtener referencia al botón y al modal
    const botonEnviar = document.getElementById('boton-enviar');
    const modalMensajeEnviado = document.getElementById('modal-mensaje-enviado');

    // Función para mostrar el modal de "mensaje enviado"
    function mostrarModalMensajeEnviado() {
        modalMensajeEnviado.style.display = 'block';
    }

    // Función para verificar el campo de correo electrónico
    function verificarCorreo() {
        const campoCorreo = document.getElementById('correo');
        const correo = campoCorreo.value.trim();

        if (correo === '') {
            alert('Por favor, ingresa un correo electrónico.');
            return false;
        }

        // Verificar el formato del correo electrónico utilizando una expresión regular simple
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            mostrarError();
            return false;
        }

        return true;
    }

    // Asignar la función de verificación al evento click del botón utilizando jQuery
    $('#boton-enviar').on('click', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        if (verificarCorreo()) {
            pregunta();
        } else {
            mostrarError();
        }
    });

    // Sweet Alert
    function pregunta() {
        swal({
            title: "¡Enviado! :D",
            text: "Pronto me pondré en contacto contigo",
            type: "success",
            timer: 1000,  // Cambia este valor al tiempo que desees en milisegundos (ejemplo: 5000 para 5 segundos)
            showConfirmButton: false
        }).then(function () {
            window.location.href = "https://itsorlo.me/";
        });
    }

    function mostrarError() {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error en el proceso.',
            confirmButtonText: 'OK'
        });
    }

})(jQuery);
