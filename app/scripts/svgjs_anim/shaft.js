'use strict';
/*global SVGjsAnim */

SVGjsAnim.prototype.setupShaft = function()
{
    var x = 150;
    var y = 0;
    var w = 950;
    var h = 450;

//    this.wistiaObjs.shaft = this.wistiaEmbed('wy0jb1fb5d');

    // Heading
//    var heading = this.draw.heading('RECEIVING', this.wistiaObjs.shaft)
//        .move(355, 50);
//    this.headings.shaft = this.draw.set().add(heading);

    var step = this.steps.shaft = this.draw.step('shaft')
//        .move(x, y)
        .data({ id: 'step-shaft' })
        .setScene(this.scene);
//        .setHeading(heading)

    this.skip = this.draw.skip(0, 0);
    step.content(this.skip);

    this.elevator = this.draw.elevator(0, 0);
    step.content(this.elevator);

    /*
    // Dump Truck
    var truckScale = 0.8;
    var truckX = -300;
    var truckY = 285;
    this.dumpTruck = this.draw.truck(truckX, truckY)
            .scale(truckScale)
            .setDumpAt(415, truckY);
    step.content(this.dumpTruck);

    // Rock Breaker
    this.rockBreakerScale = 0.8;
    this.rockBreakerX = 555;
    this.rockBreakerY = 285;
    this.rockBreaker = this.draw.rockBreaker(
        { x: this.rockBreakerX, y: this.rockBreakerY , scale: this.rockBreakerScale }
    );
    step.content(this.rockBreaker);

    // Rock Breaker Ore Pile
    var orePileRockBreaker = this.draw.image('images/ore/ore_pile_2.svg', 86, 37)
        .move(705, 400)
        .scale(0.8);
    step.content(orePileRockBreaker);

    // Bullets
    var bulletsGroup = this.bullets.shaft = this.draw.group()
        .attr({ id: 'bullets-shaft' })
        .move(680, 120)
        .attr({ opacity: 0 })
        .scale(0.75);

    var bullets = [
        'TWO SIDED DUMP\nWITH 80 TONNE\nPOCKET CAPACITY',
        'GRIZZLY CAPTURES\nORE >16"',
        'ROCK BREAKER BREAKS\nCAPTURED ORE',
        'APRON FEEDER\nCONTROLS VOLUME\nMOVING TO CRUSHER'
    ];
    bulletsGroup.add(
        this.draw.bullets(bullets, 300)
    );

    step.content(bulletsGroup);

    // Building wall (ore dumps behind)
    step.content(
        this.draw.line(249.1, 300, 249.1, 378)
            .stroke({ width: 12, color: '#0089cf' })
            .move(551, 253)
    );

    // Zoom-in
    var stepToScale = 4
      , stepToX = -1620
      , stepToY = 50;
    if (this.isAspectRatio('4:3')) {
      stepToY = 250;
    }
    var zoom = this.draw.zoom({
      width: w
      , height: h
      , id: 'shaft'
      , scale: stepToScale
      , zx: stepToX
      , zy: stepToY
    })
    .video(605, 63);
    step.setZoom(zoom);
   */

    //@TODO create moveContent()
    //step._content.move(119.5, -20);
    return step;
};

