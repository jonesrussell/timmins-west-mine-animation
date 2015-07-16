'use strict';
/*global SVGjsAnim, mill */

SVGjsAnim.prototype.images = [
    'images/arrow_left.svg',
    'images/arrow_right.svg',
    'images/background.svg',
    'images/truck/truck_body.svg',
    'images/truck/truck_dump.svg',
    'images/truck/truck_tires.svg',
    'images/video.svg'
];

SVGjsAnim.prototype.preloadedImages = false;

SVGjsAnim.prototype.preloadFinish = function() {
    mill.howManyLoaded++;
    if (mill.howManyImages ===  mill.howManyLoaded) {
        mill.preloadedImages = true;
    }
};

SVGjsAnim.prototype.preload = function() {
    this.howManyImages = this.images.length;
    this.howManyLoaded = 0;
    while (this.images.length > 0) {
        var img = document.createElement('img');
        img.src = this.images.shift();
        img.addEventListener('load', this.preloadFinish);
    }
};


