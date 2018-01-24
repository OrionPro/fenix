// табы tabs
function tabs(obj) {
	const buttons = document.querySelectorAll(obj.btn);
	const bodyTabs = document.querySelectorAll(obj.tabsBody);

	let func = function () {
		"use strict";
		for (let i = buttons.length; i--;) {
			buttons[i].classList.remove(obj.classBtn);
			bodyTabs[i].classList.remove(obj.classBody);
		}
		this.classList.add(obj.classBtn);
		let item = [].indexOf.call(buttons, this);
		bodyTabs[item].classList.add(obj.classBody)
	};

	[].forEach.call(buttons, item => item.addEventListener('click', func));
}

// Определения браузера
function get_name_browser() {
	// получаем данные userAgent
	const ua = navigator.userAgent;
	// с помощью регулярок проверяем наличие текста,
	// соответствующие тому или иному браузеру
	if (ua.search(/Edge/) > 0) return 'Edge';
	if (ua.search(/Chrome/) > 0) return 'Google Chrome';
	if (ua.search(/Firefox/) > 0) return 'Firefox';
	if (ua.search(/Opera/) > 0) return 'Opera';
	if (ua.search(/Safari/) > 0) return 'Safari';
	if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
	if (ua.search(/Trident/) > 0) return 'Trident';
	// условий может быть и больше.
	// сейчас сделаны проверки только
	// для популярных браузеров
	return 'Не определен';
}

// решаем вопрос с min-height 100% у safari до версии 11
function heightItemSafari(obj) {
	let heightItem = $(obj.itemHeight).height();
	$(obj.item).css("min-height", heightItem + obj.itemHeightBorder);
}

// Создаём цикл для инициализации mCustomScrollbar в нужных select
function customScrollbar() {
	$(document).find('.select .drop').each(function () {
		// var log = '';
		// var height = $(this).height();
		// log += 'Высота элементов: ' + height;
		// console.log(log);
		if ($(this).height() >= 190) {
			$(this).mCustomScrollbar({
				theme: "my-theme"
			});
		}
	});
}

$(document).ready(function () {

	svg4everybody({});

	$("body").addClass("index ink-transition");

	// чтобы отключить sticky в нужном месте используем этот код ,задержка нужна для того, чтобы вся страница построилась ,к примеру если есть слайдеры
	var bottomSpacingS;
	setTimeout(function () {
		bottomSpacingS = $(document).outerHeight() - ($('.top-section').outerHeight() + $('.top-section').offset().top);
	}, 500);

	setTimeout(function () {
		$(".sticky").sticky({
			topSpacing: 0,
			//bottomSpacing: bottomSpacingS,
			widthFromWrapper: false
		});
	}, 600);

	// пример анимации через библиотечку animat (но лучше анимировать через GSAP)
	//$('.our-advantages h2').animated("fadeInUp");

	// инициализация tooltipster
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".header__modal a").tooltipster({
			plugins: ['follower'],
			theme: 'tooltipster-shadow'
		});
		$(".header__logo a").tooltipster({
			theme: 'tooltipster-light'
		});
	}

	// инициализация swiper слайдера
	const swiper = new Swiper('.top-section', {
		slidesPerView: 1,
		effect: 'fade',
		navigation: {
			nextEl: '.top-section__slider-navigation .swiper-button-next',
			prevEl: '.top-section__slider-navigation .swiper-button-prev',

		},
	});
	const swiperWeDo = new Swiper('.we-do__slider', {
		slidesPerView: 5,
		loop: true,
		navigation: {
			nextEl: '.we-do .button-prev',
			prevEl: '.we-do .button-next',

		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is <= 320px
			575: {
				slidesPerView: 1
			},
			// when window width is <= 480px
			767: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			// when window width is <= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			// when window width is <= 1200px
			1200: {
				slidesPerView: 3
			}
		}
	});
	const swiperPartners = new Swiper('.partners__slider', {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.partners .button-prev',
			prevEl: '.partners .button-next',

		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is <= 320px
			575: {
				slidesPerView: 1
			},
			// when window width is <= 480px
			767: {
				slidesPerView: 2,
				spaceBetween: 10
			},
			// when window width is <= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 10
			},
			// when window width is <= 1200px
			1200: {
				slidesPerView: 3
			}
		}
	});
	const swiperAboutUs = new Swiper('.what-they-say-about-us__slider', {
		slidesPerView: 1,
		loop: true,
		effect: 'coverflow',
		navigation: {
			nextEl: '.what-they-say-about-us .swiper-button-prev',
			prevEl: '.what-they-say-about-us .swiper-button-next',

		}
	});
	// Кнопка показать ещё completed-orders__btn-wrap
	$('.completed-orders__btn-wrap button').on('click', function () {

		$(this).parents('.completed-orders').find('.item-wrap.hide').slideToggle();
		if($(this).hasClass('show')) {
			$(this).removeClass('show');
			$(this).text('ПОКАЗАТЬ ЕЩЕ');
		} else {
			$(this).addClass('show');
			$(this).text('СКРЫТЬ');
		}
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");

	customScrollbar();
	// вызов tabs
	tabs({
		btn: '.tabs-items-wrap > .tabs-item',
		tabsBody: '.tabs-wrap',
		classBody: 'active',
		classBtn: 'active'
	});
	tabs({
		btn: '.tabs-items-wrap-inner > .tabs-item',
		tabsBody: '.tabs-wrap-inner',
		classBody: 'active',
		classBtn: 'active'
	});
	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Firefox") {
		// $(".from_what_is_seo .from_what_is_seo_bot_decor svg").css("bottom", "-217px");
		// $(".website_promotion .website_promotion_decor").css("bottom", "-177px");
		// $(".cost_of_online_store .cost_of_online_store_links_item").css("margin-right", "72px");
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Edge") {
		$('.check i, .radio i').css("margin-top", "2px")
	}
	if (get_name_browser() == "Google Chrome") {

	}
	if (get_name_browser() == "Safari") {
		// heightItemSafari({
		// 	itemHeight: '.info-blocks__item-txt-block',
		// 	itemHeightBorder: 2,
		// 	item:  '.info-blocks__btn'
		// });
	}
	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// });

	// скролл по ссылке с атрибутом href
	// $(".header_nav a[href*='#']").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $(anchor.attr('href')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });
});

$(window).resize(function () {
	$(".sticky").sticky({
		topSpacing: 0,
		//bottomSpacing: bottomSpacingS,
		widthFromWrapper: false
	});
});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);