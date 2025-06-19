'use strict';

export function createRockBreakerRocks(draw) {
  const group = draw.group();

  // Add rocks
  const rocks = draw.use('Rock_Breaker_Rocks', 'images/master.svg');
  const clip = draw.rect(20, 40).move(750, 559);
  group.add(clip);
  group.clipWith(clip);
  group.add(rocks);

  // Animation methods
  group.down = function() {
    return rocks.animate(5000, '-', 0).y(120);
  };  
  group.reset = function() {
    rocks.y(0);
    return group;
  };
  group.go = function() {
    group.down().after(function(){
      group.reset();
      group.go();
    });
  };

  return group;
}

