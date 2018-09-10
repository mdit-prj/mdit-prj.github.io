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

// class Slide {
// 	selector = targetStr => document.querySelector(targetStr)
// 	selectors = targetStr => document.querySelectorAll(targetStr)
// 	addClass = (targetStr, className) => targetStr.classList.add(className);
// 	removeClass = (targetStr, className) => targetStr.classList.remove(className);
// 	addEvent = (target, eventName, callback) => target.addEventListener(eventName, callback, false);

// 	constructor(options){
// 		this.options = options;
// 		this.target = this.selector(`[data-${options.targetName}-slide]`);
// 		this.indicators = this.selector(`[data-${options.targetName}-slide-indicators]`);
// 		this.pages = this.selector(`[data-${options.targetName}-slide-pages]`);
// 		this.autoTimer = null;
// 		this.target && this.init();
// 	}

// 	init() {
// 		this.curIdx = 0;
// 		const { curIdx } = this;
// 		this.addClass(this.indicators.children[this.curIdx].children[0], "on");
// 		this.addClass(this.pages.children[this.curIdx], "on");
// 		this.setIndicator();
// 		this.autoplay();
// 	}

// 	setIndicator() {
// 		const _this = this;
// 		const { indicators, addEvent, slide } = this;
		
// 		for (let i = 0; i < indicators.children.length; i += 1) {
// 			(idx => {
// 				addEvent(indicators.children[idx], "click", event => {
// 					clearInterval(this.autoTimer);
// 					this.slide(idx);
// 				});
// 			})(i);
// 		}
// 	}

// 	slide(idx) {
// 		if (idx === this.curIdx) return;

// 		if ( idx > this.pages.children.length -1 ) {
// 			idx = 0;
// 		}
		
// 		const { pages, indicators, curIdx, removeClass, addClass } = this;
// 		const pagesChild = pages.children;
// 		const indicatorsChild = indicators.children;
// 		const nextIdx = idx;

// 		removeClass(indicatorsChild[curIdx].children[0], "on");
// 		removeClass(pagesChild[curIdx], "on");
		
// 		addClass(indicatorsChild[nextIdx].children[0], "on");
// 		addClass(pagesChild[nextIdx], "on");

// 		this.curIdx = idx;
// 	}

// 	autoplay() {
// 		const { options: { autoplay } } = this;
// 		const isAutoplay = autoplay[0];
// 		const animatingTime = autoplay[1];
// 		const delayTime = autoplay[2];
// 		isAutoplay && setInterval(() => {
// 			this.slide(this.curIdx + 1);
// 		}, animatingTime);
// 	}
// }

// class TouchSlide {
// 	constructor() {
// 		this.el = {
// 			slider: this.selector("#slider"),
// 			holder: this.selector(".holder"),
// 			slide: this.selectors(".slide"),
// 			next: this.selector('#slider .page-area .next'),
// 			prev: this.selector('#slider .page-area .prev'),
// 			current: this.selector('#slider .page-area .current'),
// 			total: this.selector('#slider .page-area .total'),
// 		};
// 		this.slideWidth = document.querySelector('#slider').clientWidth;
// 		this.touchstartx = undefined;
// 		this.touchmovex = undefined;
// 		this.movex = undefined;
// 		this.index = 0;
// 		this.longTouch = undefined;

// 		this.init();
// 	}

// 	// util
// 	selector = target => document.querySelector(target);
// 	selectors = target => document.querySelectorAll(target);
// 	on = (target, eventName, callback) => {
// 		target.addEventListener(eventName, callback.bind(target), false);
// 	}

// 	init() {
// 		this.el.total.innerHTML = this.el.slide.length
// 		this.el.current.innerHTML = this.index + 1;
// 		this.bindUIEvents();
// 	}
	
// 	bindUIEvents() {
		
// 		this.on(this.el.holder, "touchstart", event => {
// 			this.start(event);
// 		});
		
// 		this.on(this.el.holder, "touchmove", event => {
// 			this.move(event);
// 		});
		
// 		this.on(this.el.holder, "touchend", event => {
// 			this.end(event);
// 		});

// 		this.on(this.el.prev, 'click', event => {
// 			this.clickToMove('prev');
// 		});

// 		this.on(this.el.next, 'click', event => {
// 			this.clickToMove('next');
// 		});
		
// 	}
	
// 	start(event) {
// 		this.longTouch = false;
// 		setTimeout(function() {
// 			window.slider.longTouch = true;
// 		}, 250);

// 		this.touchstartx =  event.touches[0].pageX;
		
// 		this.selectors('.animate').forEach((ani, idx) => {
// 			ani.classList.remove('animate');
// 		});
// 	}
	
// 	move(event) {
// 		this.touchmovex =  event.touches[0].pageX;
// 		this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
		
// 		const { el, movex } = this;
// 		el.holder.style.transform = `translate3d(${-1 * movex.toString()}px,0,0)`;
// 	}
	
// 	end(event) {
// 		const absMove = Math.abs(this.index*this.slideWidth - this.movex);

// 		if (absMove > this.slideWidth/2 || this.longTouch === false) {
// 			if (this.movex > this.index*this.slideWidth && this.index < 2) {
// 				this.index++;
// 			} else if (this.movex < this.index*this.slideWidth && this.index > 0) {
// 				this.index--;
// 			}
// 		}      

// 		this.el.holder.classList.add('animate');
// 		this.el.holder.style.transform = 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)';

// 		this.setState();
// 	}

// 	clickToMove(flag) {
// 		const { slide } = this.el;
// 		if ( flag === 'prev' ) {
// 			this.index -= 1;
// 			this.index = this.index < 0 ? 0 : this.index;
// 		} else if ( flag === 'next' ) {
// 			this.index += 1;
// 			this.index = this.index > (slide.length - 1) ? slide.length - 1 : this.index;
// 		}
// 		this.el.holder.classList.add('animate');
// 		this.el.holder.style.transform = 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)';

// 		this.setState();
// 	}

// 	setState() {
// 		this.el.current.innerHTML = this.index + 1;
// 	}
// }

"use strict";

var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Slide = (function() {
	function Slide(options) {
		_classCallCheck(this, Slide);
		
		this.selector = function(targetStr) {
			return document.querySelector(targetStr);
		};
		
		this.selectors = function(targetStr) {
			return document.querySelectorAll(targetStr);
		};
		
		this.addClass = function(targetStr, className) {
			return targetStr.classList.add(className);
		};
		
		this.removeClass = function(targetStr, className) {
			return targetStr.classList.remove(className);
		};
		
		this.addEvent = function(target, eventName, callback) {
			return target.addEventListener(eventName, callback, false);
		};
		
		this.options = options;
		this.target = this.selector("[data-" + options.targetName + "-slide]");
		this.indicators = this.selector(
			"[data-" + options.targetName + "-slide-indicators]"
		);
		this.pages = this.selector("[data-" + options.targetName + "-slide-pages]");
		this.autoTimer = null;
		this.target && this.init();
	}
	
	_createClass(Slide, [
		{
			key: "init",
			value: function init() {
				this.curIdx = 0;
				var curIdx = this.curIdx;
				
				this.addClass(this.indicators.children[this.curIdx].children[0], "on");
				this.addClass(this.pages.children[this.curIdx], "on");
				this.setIndicator();
				this.autoplay();
			}
		},
		{
			key: "setIndicator",
			value: function setIndicator() {
				var _this2 = this;
				var _this = this;
				var indicators = this.indicators,
				addEvent = this.addEvent,
				slide = this.slide;
				
				for (var i = 0; i < indicators.children.length; i += 1) {
					(function(idx) {
						addEvent(indicators.children[idx], "click", function(event) {
							clearInterval(_this2.autoTimer);
							_this2.slide(idx);
						});
					})(i);
				}
			}
		},
		{
			key: "slide",
			value: function slide(idx) {
				if (idx === this.curIdx) return;
				
				if (idx > this.pages.children.length - 1) {
					idx = 0;
				}
				
				var pages = this.pages,
				indicators = this.indicators,
				curIdx = this.curIdx,
				removeClass = this.removeClass,
				addClass = this.addClass;
				
				var pagesChild = pages.children;
				var indicatorsChild = indicators.children;
				var nextIdx = idx;
				
				removeClass(indicatorsChild[curIdx].children[0], "on");
				removeClass(pagesChild[curIdx], "on");
				
				addClass(indicatorsChild[nextIdx].children[0], "on");
				addClass(pagesChild[nextIdx], "on");
				
				this.curIdx = idx;
			}
		},
		{
			key: "autoplay",
			value: function autoplay() {
				var _this3 = this;
				
				var autoplay = this.options.autoplay;
				
				var isAutoplay = autoplay[0];
				var animatingTime = autoplay[1];
				var delayTime = autoplay[2];
				isAutoplay &&
				setInterval(function() {
					_this3.slide(_this3.curIdx + 1);
				}, animatingTime);
			}
		}
	]);
	
	return Slide;
})();

var TouchSlide = (function() {
	function TouchSlide() {
		_classCallCheck(this, TouchSlide);
		
		this.selector = function(target) {
			return document.querySelector(target);
		};
		
		this.selectors = function(target) {
			return document.querySelectorAll(target);
		};
		
		this.on = function(target, eventName, callback) {
			target.addEventListener(eventName, callback.bind(target), false);
		};
		
		this.el = {
			slider: this.selector("#slider"),
			holder: this.selector(".holder"),
			slide: this.selectors(".slide"),
			next: this.selector("#slider .page-area .next"),
			prev: this.selector("#slider .page-area .prev"),
			current: this.selector("#slider .page-area .current"),
			total: this.selector("#slider .page-area .total")
		};
		this.slideWidth = document.querySelector("#slider").clientWidth;
		this.touchstartx = undefined;
		this.touchmovex = undefined;
		this.movex = undefined;
		this.index = 0;
		this.longTouch = undefined;
		
		this.init();
	}
	
	// util
	
	_createClass(TouchSlide, [
		{
			key: "init",
			value: function init() {
				this.el.total.innerHTML = this.el.slide.length;
				this.el.current.innerHTML = this.index + 1;
				this.bindUIEvents();
			}
		},
		{
			key: "bindUIEvents",
			value: function bindUIEvents() {
				var _this4 = this;
				
				this.on(this.el.holder, "touchstart", function(event) {
					_this4.start(event);
				});
				
				this.on(this.el.holder, "touchmove", function(event) {
					_this4.move(event);
				});
				
				this.on(this.el.holder, "touchend", function(event) {
					_this4.end(event);
				});
				
				this.on(this.el.prev, "click", function(event) {
					_this4.clickToMove("prev");
				});
				
				this.on(this.el.next, "click", function(event) {
					_this4.clickToMove("next");
				});
			}
		},
		{
			key: "start",
			value: function start(event) {
				this.longTouch = false;
				setTimeout(function() {
					window.slider.longTouch = true;
				}, 250);
				
				this.touchstartx = event.touches[0].pageX;
				
				this.selectors(".animate").forEach(function(ani, idx) {
					ani.classList.remove("animate");
				});
			}
		},
		{
			key: "move",
			value: function move(event) {
				this.touchmovex = event.touches[0].pageX;
				this.movex =
				this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
				
				var el = this.el,
				movex = this.movex;
				
				el.holder.style.transform =
				"translate3d(" + -1 * movex.toString() + "px,0,0)";
			}
		},
		{
			key: "end",
			value: function end(event) {
				var absMove = Math.abs(this.index * this.slideWidth - this.movex);
				
				if (absMove > this.slideWidth / 2 || this.longTouch === false) {
					if (this.movex > this.index * this.slideWidth && this.index < 2) {
						this.index++;
					} else if (
						this.movex < this.index * this.slideWidth &&
						this.index > 0
					) {
						this.index--;
					}
				}
				
				this.el.holder.classList.add("animate");
				this.el.holder.style.transform =
				"translate3d(-" + this.index * this.slideWidth + "px,0,0)";
				
				this.setState();
			}
		},
		{
			key: "clickToMove",
			value: function clickToMove(flag) {
				var slide = this.el.slide;
				
				if (flag === "prev") {
					this.index -= 1;
					this.index = this.index < 0 ? 0 : this.index;
				} else if (flag === "next") {
					this.index += 1;
					this.index =
					this.index > slide.length - 1 ? slide.length - 1 : this.index;
				}
				this.el.holder.classList.add("animate");
				this.el.holder.style.transform =
				"translate3d(-" + this.index * this.slideWidth + "px,0,0)";
				
				this.setState();
			}
		},
		{
			key: "setState",
			value: function setState() {
				this.el.current.innerHTML = this.index + 1;
			}
		}
	]);
	
	return TouchSlide;
})();



var afterLoad = function(event){

	var winWidth = window.innerWidth;
		var ua = navigator.userAgent.toLowerCase
		var mobileRegExp = /ipad|iphone|android/.test(ua);
		var sizeToBeChanged = winWidth < 1024;
		var isMobile = mobileRegExp || sizeToBeChanged;

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

	// parallax
	(function(){

		var mask = selector('.mask');

		if ( !mask ) return;

		var imgSrc = selector('.mask .before-change').dataset.img;
		var before = selector('.mask .before-change .img-wrapper');
		var after = selector('.mask .after-change .img-wrapper');
		var afterHead = selector('.mask .after-change .head');
		var calculateAspectRatioFit = function() {
			var img = new Image();
			img.src = imgSrc;
			img.addEventListener('load', function(event) {
				var srcWidth = img.naturalWidth,
					srcHeight = img.naturalHeight,
					maxWidth = window.innerWidth
				console.log(srcWidth, srcHeight, maxWidth);
				before.style.height = ( srcHeight * maxWidth ) / srcWidth + 'px';
				after.style.height = (( srcHeight * maxWidth ) / srcWidth) + (window.innerHeight*1.5) + 'px';
				afterHead.style.bottom = isMobile ? window.innerWidth + 'px' : window.innerHeight + 'px';
			}, false);
		}
		calculateAspectRatioFit();
		window.addEventListener('scroll', function() {
			var maskTop = mask.offsetTop;
			if ( window.scrollY > maskTop ) {
				before.classList.add('on');
				after.classList.add('on')
			} else {
				before.classList.remove('on');
				after.classList.remove('on');
			}
			console.log('mask top', maskTop, window.scrollY);
		}, false);
	})();

	// 모바일일 경우 햄버거 메뉴 기능 실행
	(function(){

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
				console.log(11);
				event.preventDefault();
				mobileMenuToggle(idx);
			}, true);
		});

	})();
}

// like a 'jQuery.ready()'
try {
	document.addEventListener('DOMContentLoaded', afterLoad);
} catch(e) {
	// like a 'jQuery.ready()'
	document.addEventListener('load', afterLoad);
}