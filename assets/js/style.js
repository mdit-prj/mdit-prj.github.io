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



// dom structure
/*
<div data-mk-slide class="slide-area-01">
<ul data-mk-slide-indicator class="tab">
<li><a href="#" class="on">선형</a></li>
<li><a href="#">모드</a></li>
<li><a href="#">열전달</a></li>
</ul>
<ul data-mk-slide-pages class="slide-image">
<li><img src="./assets/images/temp-video-03.jpg" alt=""></li>
<li style="display: none;"><img src="./assets/images/temp-video-04.jpg" alt=""></li>
<li style="display: none;"><img src="./assets/images/temp-video-05.jpg" alt=""></li>
</ul>
</div>
*/

// slide plugin
/**
* usage
* new Slide({
*	autoplay: [true, 4000],
*	targetName: 'mk'
* })
*/
'use strict';

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
		
		this.options = options;
		this.target = this.selector("[data-" + options.targetName + "-slide]");
		this.indicators = this.selector(
			"[data-" + options.targetName + "-slide-indicators]"
		);
		this.pages = this.selector("[data-" + options.targetName + "-slide-pages]");
		this.target && this.init();
	}
	
	_createClass(Slide, [
		{
			key: "init",
			value: function init() {
				this.curIdx = 0;
				this.addClass(this.indicators.children[this.curIdx].children[0], "on");
				this.addClass(this.pages.children[this.curIdx], "on");
				this.setIndicator();
			}
		},
		{
			key: "setIndicator",
			value: function setIndicator() {
				var _this = this;
				var indicators = this.indicators,
				addEvent = this.addEvent,
				slide = this.slide;
				
				for (var i = 0; i < indicators.children.length; i += 1) {
					(function(idx) {
						addEvent(indicators.children[idx], "click", function(event) {
							return slide.call(_this, idx);
						});
					})(i);
				}
			}
		},
		{
			key: "addEvent",
			value: function addEvent(target, eventName, callback) {
				target.addEventListener(eventName, callback.bind(target), false);
			}
		},
		{
			key: "slide",
			value: function slide(idx) {
				if (idx === this.curIdx) return;
				
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
		}
	]);
	
	return Slide;
})();
	
	
// like a 'jQuery.ready()'
document.addEventListener('DOMContentLoaded', () => {

	// 슬라이드 실행
	new Slide({
		autoplay: [true, 4000],
		targetName: 'mk'
	});

	// 모바일일 경우 햄버거 메뉴 기능 실행
	(function(){
		var selector = function (target) {
			return document.querySelector(target);
		}

		selector('.hamburger').addEventListener('click', function(event) {
			var winWidth = window.innerWidth;
			var ua = navigator.userAgent.toLowerCase
			var isMobile = /ipad|iphone|android/.test(ua);
			if ( isMobile || winWidth < 1024 ) {
				selector('.nav').classList.add('opened');
			}
		}, false)

		var closeFunc = function(event) {
			selector('.nav').classList.remove('opened');
		};
		selector('.nav > .dimm').addEventListener('click', closeFunc, false);
		selector('.nav nav .menu-info').addEventListener('click', closeFunc, false);
	})()
});