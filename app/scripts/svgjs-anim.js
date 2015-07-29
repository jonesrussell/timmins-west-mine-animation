'use strict';
/*global SVG, mill */

function SVGjsAnim(id)
{
    this.draw = SVG(id)
        .addClass('svg-content')
        .spof();

    this.scene = this.draw
        .group()
        .attr({ id: 'scene' });

    this.positionAndScale();
}

SVGjsAnim.prototype.headings = {};

SVGjsAnim.prototype.init = function() {
    var svgjsAnim = mill;
    if (svgjsAnim.preloadedImages) {
        var loadingImage = document.getElementById('anim-loading');
        loadingImage.parentNode.removeChild(loadingImage);
        svgjsAnim.build();
        svgjsAnim.start();
    } else {
        setTimeout(svgjsAnim.init, 100);
    }
};

SVGjsAnim.prototype.build = function() {
    this.transform.defaultX = this.scene.x();
    this.transform.defaultY = this.scene.y();
    var w = this.origSceneW;
    var h = this.origSceneH;

    var background    = this.draw.image('images/background.svg', w, h);
    this.scene.add(background);

    var clouds        = this.draw.image('images/clouds.svg', w, h);
    this.cloudGroup = this.draw.group().attr({ id: 'cloud-group' })
      .add(clouds)
      .add(clouds.clone().move(-w, 0));
    this.scene.add(this.cloudGroup);

    this.initShaft();
    this.shaft = this.getShaft();
    this.scene.add(this.shaft);

    this.headings.hoisting = this.draw.use('Hoisting_Video_1_', 'images/headings.svg');
    this.headings.hoisting.move(-50, -1250);
    this.scene.add(this.headings.hoisting);
};


SVGjsAnim.prototype.start = function()
{
  this.skipGo();
//  this.elevator.go();
//    this.showBullets();
//    this.dumpTruck.go();
//    this.rockBreaker.go();
//    this.jawCrusher.go();
/*
  this.cloudGroup
    .animate(180000, '-', 0)
    .move(this.origSceneW, 0)
    .loop();
   */
};

SVGjsAnim.prototype.scale = function(n) {
    n = n || false;
    return (n) ? this.scene.scale(n) : this.scene.attr('scale');
};

SVGjsAnim.prototype.move = function(x, y) {
    this.scene.move(x, y);
};

SVGjsAnim.prototype.x = function(x) {
    this.scene.x(x);
};

SVGjsAnim.prototype.y = function(y) {
    this.scene.y(y);
};

