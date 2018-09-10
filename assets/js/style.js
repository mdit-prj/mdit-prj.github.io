/* style java script */

'use strict';

var afterLoad = function() {

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

	// ===========================================================

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
			var scrolltop = window.scrollY || document.documentElement.scrollTop;
			if ( scrolltop > maskTop ) {
				before.classList.add('on');
				after.classList.add('on')
			} else {
				before.classList.remove('on');
				after.classList.remove('on');
			}
			console.log('mask top', maskTop, scrolltop);
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

		for( var i=0; i < hasSubLists.length; i+=1 ) {
			(function(idx) {
				hasSubLists[idx].children[0].addEventListener('click', function(event) {
					console.log(11);
					event.preventDefault();
					mobileMenuToggle(idx);
				}, true);
			})(i)
		}


	})();
	
}
	
// like a 'jQuery.ready()'
try {
	document.addEventListener('DOMContentLoaded', afterLoad);
} catch(e) {
	document.addEventListener('load', afterLoad);
}