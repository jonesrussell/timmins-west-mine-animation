'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.ThunderCreek = function() {
  this.thunderCreek = this.draw
    .group()
    .attr('id', 'thunderCreek');
  this.scene.add(this.thunderCreek);

  /* Zimba */
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

  /* Scooptram */
  this.scooptramTC = this.draw.scooptram()
    .move(-700, -42.5)
    .setX(50)
  ;
  this.thunderCreek.add(this.scooptramTC);
  this.scooptramTC.go();

  this.headings.thunderCreek = this.Heading('Haulage_Video', 'thunderCreek', 3.65, 560, 600);
  this.sceneHeadings
    .add(this.headings.thunderCreek);

  return this;
};
