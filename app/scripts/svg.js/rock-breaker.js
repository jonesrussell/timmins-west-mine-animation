'use strict';
/*global SVG */

export function createRockBreaker(draw) {
  const group = draw.group();

  // Add parts
  const arm = draw.use('Rock_Breaker_Arm', 'images/master.svg');
  const bit = draw.use('Rock_Breaker_Bit', 'images/master.svg');
  const circle = draw.use('Rock_Breaker_Circle', 'images/master.svg');

  group.add(arm).add(bit).add(circle);

  // Animation parameters
  const t = 500;
  const strike = 250;

  // Animation methods
  group.up = function() {
    arm.animate(t).rotate(-0.02).x(0.1).y(-0.1);
    return bit.animate(t).rotate(-0.05);
  };
  group.down = function() {
    arm.animate(strike).rotate(0.02).x(-0.1).y(0.1);
    return bit.animate(t).rotate(0.05);
  };
  group.reset = function() {
    arm.animate(t).rotate(0).x(0).y(0);
    return bit.animate(t).rotate(0);
  };
  group.go = function() {
    group.up().after(function(){
      group.down().after(function(){
        group.reset().after(function() {
          group.go();
        });
      });
    });
  };

  return group;
}
