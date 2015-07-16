'use strict';
/*global SVGjsAnim, mill */

/*window.onresize = function() {
  mill.positionAndScale();
  mill.resize();
};*/

SVGjsAnim.prototype.positionAndScale = function()
{
  this.transform = {
      x: 0
    , y: 0
    , scale: 0
    , width: 0
    , height: 0
    , defaultX: 0
    , defaultY: 0
    , defaultScale: 0
    , defaultWidth: 0
    , defaultHeight: 0
  };

  // Browser
  this.windowW = this.getWindowWidth();
  this.windowH = this.getWindowHeight();
  this.aspectRatio = this.calcAspectRatio(this.windowW, this.windowH);

  // Scene
  this.origSceneW = 1366;
  this.origSceneH = 700;

  this.draw.viewbox(0, 0, this.origSceneW, this.origSceneH)
  this.draw.attr('preserveAspectRatio', 'xMinYMax meet');
  console.log(this.draw.viewbox());

  this.transform.width = this.transform.defaultWidth = this.windowW;
  this.transform.height = this.transform.defaultHeight = this.windowH;
//  var sceneResizePercent = this.calcResizePercent(this.origSceneW, this.transform.width);
//  console.log(sceneResizePercent);
//  this.transform.scale = 1 - sceneResizePercent;

  var svgHeight = this.origSceneH * this.transform.scale;
  var remainingHeight = this.transform.height - svgHeight;
//  this.transform.y = this.transform.defaultY = (remainingHeight / 3) * 1.5;
  this.transform.y = this.transform.defaultY = remainingHeight;

  console.log('Aspect Ratio: ' + this.aspectRatio);
  console.log('Resolution: ' + this.windowW + 'x' + this.windowH);
  console.log('scene h: ' + this.transform.height);
  console.log('scene y: ' + this.transform.y);
  console.log('svgHeight: ' + svgHeight);
  console.log(this.x() + ':' + this.y());
};

SVGjsAnim.prototype.x = function(x) {
  x = x || false;
  if (x) { this.transform.x = x; }
  else { return this.transform.x; }
};

SVGjsAnim.prototype.y = function(y) {
  y = y || false;
  if (y) { this.transform.y = y; }
  else { return this.transform.y; }
};

/***********
 * Helpers *
 ***********/
SVGjsAnim.prototype.getWindowHeight = function() {
  var viewportHeight;
  if (document.compatMode === 'BackCompat') {
    viewportHeight = document.body.clientHeight;
  } else {
    viewportHeight = document.documentElement.clientHeight;
  }
  return viewportHeight;
};

SVGjsAnim.prototype.getWindowWidth = function() {
  var viewportWidth;
  if (document.compatMode === 'BackCompat') {
    viewportWidth = document.body.clientWidth;
  } else {
    viewportWidth = document.documentElement.clientWidth;
  }
  return viewportWidth;
};

SVGjsAnim.prototype.calcScale = function(n)
{
  if (n === this.transform.scale) { return n; }
  return n * this.transform.scale;
};

SVGjsAnim.prototype.calcAspectRatio = function(w, h) {
  var ratio = w / h;
  return (Math.abs(ratio - 4 / 3) < Math.abs(ratio - 16 / 9)) ? '4:3' : '16:9';
};

SVGjsAnim.prototype.isAspectRatio = function(n) {
  return (this.aspectRatio === n) ? true : false;
};

SVGjsAnim.prototype.calcResizePercent = function(n, n2) {
  return (n - n2) / n;
};

