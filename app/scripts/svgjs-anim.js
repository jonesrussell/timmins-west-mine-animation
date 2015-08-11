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

  this.origSceneW = 1366;
  this.origSceneH = 700;

  this.draw.viewbox(0, 0, this.origSceneW, this.origSceneH);
  this.draw.attr('preserveAspectRatio', 'xMidYMax meet');
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
    var w = this.origSceneW;
    var h = this.origSceneH;

    var background    = this.draw.image('images/background.svg', w, h);
    this.scene.add(background);

    var clouds        = this.draw.image('images/clouds.svg', w, h);
    this.cloudGroup = this.draw.group().attr({ id: 'cloud-group' })
      .add(clouds)
      .add(clouds.clone().move(-w, 0));
    this.scene.add(this.cloudGroup);

    var equipment    = this.draw.image('images/equipment.svg', w, h);
    this.scene.add(equipment);

    var text    = this.draw.image('images/text.svg', w, h);
    this.scene.add(text);

    this.Hoisting()
      .go();

    this.Development();
    this.Haulage();
    this.Skipping();
    this.Shop();
    this.Stoping();
};

SVGjsAnim.prototype.start = function()
{
  this.cloudGroup
    .animate(380000, '-', 0)
    .move(this.origSceneW, 0)
    .loop();
};
