class TouchSlide {
	constructor() {
		this.el = {
			slider: this.selector("#slider"),
			holder: this.selector(".holder"),
			imgSlide: this.selectors(".slide-image")	
		};
		this.slideWidth = this.selector('#slider').clientWidth;
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
		target.addEventListener(eventName, callback, false);
	}

	init() {
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
		
	}
	
	start(event) {
		// Test for flick.
		this.longTouch = false;
		setTimeout(function() {
			window.slider.longTouch = true;
		}, 250);

		// Get the original touch position.
		this.touchstartx =  event.touches[0].pageX;
		
		// The movement gets all janky if there's a transition on the elements.
		this.selectors('.animate').forEach((ani, idx) => {
			ani.classList.remove('animate');
		});
	}
	
	move(event) {
		// Continuously return touch position.
		this.touchmovex =  event.touches[0].pageX;
		// Calculate distance to translate holder.
		this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
		// Defines the speed the images should move at.
		const panx = 100-this.movex/6;
		if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
			this.el.holder.style.transform = 'translate3d(-' + this.movex + 'px,0,0)';
		}
		if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
			this.el.imgSlide.forEach((img, idx) => {
				img.style.transform = 'translate3d(-' + panx + 'px,0,0)';
			});
		}
	}
	
	end(event) {
		// Calculate the distance swiped.
		const absMove = Math.abs(this.index*this.slideWidth - this.movex);
		// Calculate the index. All other calculations are based on the index.
		if (absMove > this.slideWidth/2 || this.longTouch === false) {
			if (this.movex > this.index*this.slideWidth && this.index < 2) {
				this.index++;
			} else if (this.movex < this.index*this.slideWidth && this.index > 0) {
				this.index--;
			}
		}      
		// Move and animate the elements.
		this.el.holder.classList.add('animate');
		this.el.holder.style.transform = 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)';
		this.el.imgSlide.forEach((img, idx) => {
			img.classList.add('animate');
			img.style.transform = 'translate3d(-' + 100-this.index*50 + 'px,0,0)';
		});
		
	}
}

new TouchSlide();

// var slider = {
	
// 	el: {
// 		slider: $("#slider"),
// 		holder: $(".holder"),
// 		imgSlide: $(".slide-image")
// 	},
	
// 	slideWidth: $('#slider').width(),
// 	touchstartx: undefined,
// 	touchmovex: undefined,
// 	movex: undefined,
// 	index: 0,
// 	longTouch: undefined,
	
// 	init: function() {
// 		this.bindUIEvents();
// 	},
	
// 	bindUIEvents: function() {
		
// 		this.el.holder.on("touchstart", function(event) {
// 			slider.start(event);
// 		});
		
// 		this.el.holder.on("touchmove", function(event) {
// 			slider.move(event);
// 		});
		
// 		this.el.holder.on("touchend", function(event) {
// 			slider.end(event);
// 		});
		
// 	},
	
// 	start: function(event) {
// 		// Test for flick.
// 		this.longTouch = false;
// 		setTimeout(function() {
// 			window.slider.longTouch = true;
// 		}, 250);
		
// 		// Get the original touch position.
// 		this.touchstartx =  event.originalEvent.touches[0].pageX;
		
// 		// The movement gets all janky if there's a transition on the elements.
// 		$('.animate').removeClass('animate');
// 	},
	
// 	move: function(event) {
// 		// Continuously return touch position.
// 		this.touchmovex =  event.originalEvent.touches[0].pageX;
// 		// Calculate distance to translate holder.
// 		this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
// 		// Defines the speed the images should move at.
// 		var panx = 100-this.movex/6;
// 		if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
// 			this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
// 		}
// 		if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
// 			this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
// 		}
// 	},
	
// 	end: function(event) {
// 		// Calculate the distance swiped.
// 		var absMove = Math.abs(this.index*this.slideWidth - this.movex);
// 		// Calculate the index. All other calculations are based on the index.
// 		if (absMove > this.slideWidth/2 || this.longTouch === false) {
// 			if (this.movex > this.index*this.slideWidth && this.index < 2) {
// 				this.index++;
// 			} else if (this.movex < this.index*this.slideWidth && this.index > 0) {
// 				this.index--;
// 			}
// 		}      
// 		// Move and animate the elements.
// 		this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
// 		this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
		
// 	}
	
// };
// slider.init();