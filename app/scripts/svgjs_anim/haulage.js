'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.Haulage = function() {
  this.haulage = this.draw
    .group()
    .attr('id', 'haulage');

  this.zimbaDrill = this.draw.use('TC_Zimba_Longhole_Drill', 'images/master.svg');
  this.zimbaParts = this.draw.use('TC_Zimba_Longhole_Parts', 'images/master.svg');
  this.zimba = this.draw
    .group()
    .add(this.zimbaDrill)
    .add(this.zimbaParts)
  ;
  this.scene.add(this.zimba);
  this.zimba
    .animate(6000)
    .x(100)
    .loop()
  ;

  this.scooptramHaulage = this.draw.scooptram()
    .move(-700, -42.5)
    .setX(50)
  ;
  this.haulage.add(this.scooptramHaulage);
  this.scooptramHaulage.go();


  this.headings.haulage = this.Heading('Haulage_Video', 'haulage', 3.65, 560, 600);

  this.scene
    .add(this.haulage);

  this.sceneHeadings
    .add(this.headings.haulage);

  return this;
};

