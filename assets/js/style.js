/* style java script */

/* 서브 네비게이션 스크롤 고정 이벤트 */
$(function() {
	var subNav = $('.sub-nav');
	//nav 위치
	var navTop = subNav.offset().top;
	//스크롤 할 때마다 실행
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		//스크롤 위치가 nav의 위치보다 아래라면 클래스 fixed 추가
		if (winTop >= navTop) {
			subNav.addClass('nav-fixed')
		} else if (winTop <= navTop) {
			subNav.removeClass('nav-fixed')
		}
	});

});

'use strict';

class Slide {
	selector = targetStr => document.querySelector(targetStr)
	selectors = targetStr => document.querySelectorAll(targetStr)
	addClass = (targetStr, className) => targetStr.classList.add(className);
	removeClass = (targetStr, className) => targetStr.classList.remove(className);
	addEvent = (target, eventName, callback) => target.addEventListener(eventName, callback, false);

	constructor(options){
		this.options = options;
		this.target = this.selector(`[data-${options.targetName}-slide]`);
		this.indicators = this.selector(`[data-${options.targetName}-slide-indicators]`);
		this.pages = this.selector(`[data-${options.targetName}-slide-pages]`);
		this.autoTimer = null;
		this.target && this.init();
	}

	init() {
		this.curIdx = 0;
		const { curIdx } = this;
		this.addClass(this.indicators.children[this.curIdx].children[0], "on");
		this.addClass(this.pages.children[this.curIdx], "on");
		this.setIndicator();
		this.autoplay();
	}

	setIndicator() {
		const _this = this;
		const { indicators, addEvent, slide } = this;
		
		for (let i = 0; i < indicators.children.length; i += 1) {
			(idx => {
				addEvent(indicators.children[idx], "click", event => {
					clearInterval(this.autoTimer);
					this.slide(idx);
				});
			})(i);
		}
	}

	slide(idx) {
		if (idx === this.curIdx) return;

		if ( idx > this.pages.children.length -1 ) {
			idx = 0;
		}
		
		const { pages, indicators, curIdx, removeClass, addClass } = this;
		const pagesChild = pages.children;
		const indicatorsChild = indicators.children;
		const nextIdx = idx;

		removeClass(indicatorsChild[curIdx].children[0], "on");
		removeClass(pagesChild[curIdx], "on");
		
		addClass(indicatorsChild[nextIdx].children[0], "on");
		addClass(pagesChild[nextIdx], "on");

		this.curIdx = idx;
	}

	autoplay() {
		const { options: { autoplay } } = this;
		const isAutoplay = autoplay[0];
		const animatingTime = autoplay[1];
		const delayTime = autoplay[2];
		isAutoplay && setInterval(() => {
			this.slide(this.curIdx + 1);
		}, animatingTime);
	}
}

class TouchSlide {
	constructor() {
		this.el = {
			slider: this.selector("#slider"),
			holder: this.selector(".holder"),
			slide: this.selectors(".slide"),
			next: this.selector('#slider .page-area .next'),
			prev: this.selector('#slider .page-area .prev'),
			current: this.selector('#slider .page-area .current'),
			total: this.selector('#slider .page-area .total'),
		};
		this.slideWidth = document.querySelector('#slider').clientWidth;
		this.touchstartx = undefined;
		this.touchmovex = undefined;
		this.movex = undefined;
		this.index = 0;
		this.longTouch = undefined;

		this.init();
	}

	// util
	selector = target => document.querySelector(target);
	selectors = target => document.querySelectorAll(target);
	on = (target, eventName, callback) => {
		target.addEventListener(eventName, callback.bind(target), false);
	}

	init() {
		this.el.total.innerHTML = this.el.slide.length
		this.el.current.innerHTML = this.index + 1;
		this.bindUIEvents();
	}
	
	bindUIEvents() {
		
		this.on(this.el.holder, "touchstart", event => {
			this.start(event);
		});
		
		this.on(this.el.holder, "touchmove", event => {
			this.move(event);
		});
		
		this.on(this.el.holder, "touchend", event => {
			this.end(event);
		});

		this.on(this.el.prev, 'click', event => {
			this.clickToMove('prev');
		});

		this.on(this.el.next, 'click', event => {
			this.clickToMove('next');
		});
		
	}
	
	start(event) {
		this.longTouch = false;
		setTimeout(function() {
			window.slider.longTouch = true;
		}, 250);

		this.touchstartx =  event.touches[0].pageX;
		
		this.selectors('.animate').forEach((ani, idx) => {
			ani.classList.remove('animate');
		});
	}
	
	move(event) {
		this.touchmovex =  event.touches[0].pageX;
		this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
		
		const { el, movex } = this;
		el.holder.style.transform = `translate3d(${-1 * movex.toString()}px,0,0)`;
	}
	
	end(event) {
		const absMove = Math.abs(this.index*this.slideWidth - this.movex);

		if (absMove > this.slideWidth/2 || this.longTouch === false) {
			if (this.movex > this.index*this.slideWidth && this.index < 2) {
				this.index++;
			} else if (this.movex < this.index*this.slideWidth && this.index > 0) {
				this.index--;
			}
		}      

		this.el.holder.classList.add('animate');
		this.el.holder.style.transform = 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)';

		this.setState();
	}

	clickToMove(flag) {
		const { slide } = this.el;
		if ( flag === 'prev' ) {
			this.index -= 1;
			this.index = this.index < 0 ? 0 : this.index;
		} else if ( flag === 'next' ) {
			this.index += 1;
			this.index = this.index > (slide.length - 1) ? slide.length - 1 : this.index;
		}
		this.el.holder.classList.add('animate');
		this.el.holder.style.transform = 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)';

		this.setState();
	}

	setState() {
		this.el.current.innerHTML = this.index + 1;
	}
}

$(window).on('scroll wheel mousewheel', e => {
	if ( window.scrollY >= 20) {
		e.preventDefault();
	}
});
	
	
// like a 'jQuery.ready()'
document.addEventListener('DOMContentLoaded', () => {

	var selector = function (target) {
		return document.querySelector(target);
	}
	var selectors = function (target) {
		return document.querySelectorAll(target);
	}

	// 슬라이드 실행
	new Slide({
		autoplay: [true, 5000, 5000],
		targetName: 'mk',
	});

	selector('#slider') && new TouchSlide();

	// 모바일일 경우 햄버거 메뉴 기능 실행
	(function(){
		var winWidth = window.innerWidth;
		var ua = navigator.userAgent.toLowerCase
		var mobileRegExp = /ipad|iphone|android/.test(ua);
		var sizeToBeChanged = winWidth < 1024;
		var isMobile = mobileRegExp || sizeToBeChanged;

		selector('.hamburger').addEventListener('click', function(event) {
			isMobile && selector('.nav').classList.add('opened');
		}, false);

		var closeFunc = function(event) {
			selector('.nav').classList.remove('opened');
		};
		selector('.nav > .dimm').addEventListener('click', closeFunc, false);
		selector('.nav nav .menu-info').addEventListener('click', closeFunc, false);

		// sub menu toggle -> 1024 미만 일 때
		var hasSubLists = selectors('[data-has-sub]');
		function mobileMenuToggle(targetIdx) {
			hasSubLists[targetIdx].classList.add('on');
			hasSubLists.forEach(function(subList, idx) {
				if (idx !== targetIdx ) {
					subList.classList.remove('on');
				}
			});
		}
		hasSubLists.forEach(function(subList, idx) {
			subList.children[0].addEventListener('click', function(event) {
				event.preventDefault();
				mobileMenuToggle(idx);
			}, true);
		});

	})();

	// mask
	const masking = event => {
		// let mask = selector('.mask');
		// console.log(window.scrollY >= mask.offsetTop);
		if ( window.scrollY >= 20) {
		// 	window.scrollTop = mask.offsetTop;
			event.stopPropagation();
			event.preventDefault();
		}
	}
	// window.addEventListener('scroll', masking, false);
	// window.addEventListener('DOMMouseScroll', masking, false);
	// window.addEventListener('wheel', masking, false);
	// window.addEventListener('mousewheel', masking, false);
	// selector('.mask')
	
});