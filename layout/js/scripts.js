function init() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            header = $('.header'),
            links = $('.header__a'),
            logo = $('.header__logo'),
            icon = $('.header__icon');
        if (distanceY > shrinkOn) {
            header.addClass('header_smaller');
            links.each(function () {
                $(this).addClass('header__a_smaller');
            });
            logo.addClass('header__logo_smaller');
            icon.addClass('header__icon_smaller');
        } else {
            if (header.hasClass('header_smaller')) {
                header.removeClass('header_smaller');
            }
            links.each(function () {
                var element = $(this);
                if (element.hasClass('header__a_smaller')) {
                    element.removeClass('header__a_smaller');
                }
            });
            if (logo.hasClass('header__logo_smaller')) {
                logo.removeClass('header__logo_smaller');
            }
            if (icon.hasClass('header__icon_smaller')) {
                icon.removeClass('header__icon_smaller');
            }
        }
    });
}
window.onload = init();
