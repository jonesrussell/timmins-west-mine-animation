'use strict';
/*global SVG, mill */

/*
    Features:
        - image preloading
        - stepping
        - zoom
        - animation paths
*/
function SVGjsAnim(id)
{
    this.draw = SVG(id)
        .fixSubPixelOffset();

    this.scene = this.draw.group()
        .attr({ id: 'scene' });

    this.positionAndScale();
    this.resize();

    this.zooms = this.draw.set();
}

SVGjsAnim.prototype.layers = {};
SVGjsAnim.prototype.activeVideo = '';
SVGjsAnim.prototype.zoomed = false;
SVGjsAnim.prototype.stepObjs = [];
SVGjsAnim.prototype.bullets = {};
//SVGjsAnim.prototype.headings = {};
SVGjsAnim.prototype.animations = [];
SVGjsAnim.prototype.steps = [];
SVGjsAnim.prototype.stepCurrent = 'overview';

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
//    this.resetCamera();
    this.layers = this.setupLayers();

    var shaft = this.setupShaft();

//    this.layers.background
//        .addToInner(shaft);
        this.scene.add(shaft);
};

SVGjsAnim.prototype.setupLayers = function()
{
    var w = this.origSceneW;
    var h = this.origSceneH;
    var layers = {};

    var clouds        = this.draw.image('images/clouds.svg', w*2, h);
    layers.clouds     = this.draw.layer({ 'clouds': clouds }, w, h);
    var background    = this.draw.image('images/background.svg', w, h);
    layers.background = this.draw.layer({ 'background': background }, w, h);
/*
    var groundExtension = this.draw.group()
        .move(0, 220)
        .add(this.draw.rect(this.origSceneW, 4000).attr({ fill: '#6e6e5f', id: 'ground'}));
*/
    this.scene
        .add(layers.clouds)
//        .add(groundExtension)
        .add(layers.background);

   return layers;
};

SVGjsAnim.prototype.start = function()
{
//    this.showBullets();
//    this.dumpTruck.go();
//    this.rockBreaker.go();
//    this.jawCrusher.go();
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

