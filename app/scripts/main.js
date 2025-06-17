import { SVG } from '@svgdotjs/svg.js';
import './svg-extensions';

// Initialize SVG.js
const draw = SVG().addTo('#mine-animation').size('100%', '100%');

// Create a group for the mine elements
const mineGroup = draw.group();

// Export the draw instance and mine group for use in other modules
export { draw, mineGroup }; 