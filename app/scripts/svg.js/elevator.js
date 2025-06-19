'use strict';
/*global SVG */

export function createElevator(draw) {
  // Create a group for the elevator
  const group = draw.group();

  // Path points for animation
  const pathPoints = [
    { y: -96, duration: 5000 },
    { y: -270, duration: 5000 },
    { y: -470, duration: 5000 },
    { y: -270, duration: 5000 },
    { y: -96, duration: 5000 },
    { y: 0, duration: 5000 }
  ];
  let pathCounter = 0;

  // Create and add the clip
  const clip = draw.rect(1366, 700).move(0, 217);
  group.add(clip);

  // Create and add the elevator body
  const elevatorBody = draw.image('images/elevator.svg', 1366, 700).clipWith(clip);
  group.add(elevatorBody);

  // Animation method
  group.go = function() {
    const i = pathCounter;
    pathCounter = (pathCounter + 1) % pathPoints.length;
    elevatorBody
      .animate(pathPoints[i].duration)
      .y(pathPoints[i].y)
      .after(() => group.go());
  };

  return group;
}
