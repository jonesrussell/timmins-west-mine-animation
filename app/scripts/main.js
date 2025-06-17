import { SVG } from '@svgdotjs/svg.js';
import './svg-extensions';

// Initialize SVG.js
const draw = SVG().addTo('#mine-animation').size('100%', '100%');

// Create a group for the mine elements
const mineGroup = draw.group();

// Example usage of custom elements
const step = mineGroup.step();
const skip = mineGroup.skip();
const elevator = mineGroup.elevator();
const dumpTruck = mineGroup.dumpTruck();
const scooptram = mineGroup.scooptram();
const ithDrill = mineGroup.ithDrill();
const groundSupport = mineGroup.groundSupport();
const jumboDrill = mineGroup.jumboDrill();
const longholes = mineGroup.longholes();
const rockBreaker = mineGroup.rockBreaker();
const jawCrusher = mineGroup.jawCrusher();
const zimba = mineGroup.zimba();

// Export the draw instance and mine group for use in other modules
export { draw, mineGroup }; 