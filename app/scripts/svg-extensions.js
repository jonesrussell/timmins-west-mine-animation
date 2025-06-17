import { SVG, G } from '@svgdotjs/svg.js';

// Define custom elements
const customElements = {
  Step: G,
  Skip: G,
  Elevator: G,
  DumpTruck: G,
  Scooptram: G,
  ITHDrill: G,
  GroundSupport: G,
  JumboDrill: G,
  Longholes: G,
  RockBreaker: G,
  JawCrusher: G,
  Zimba: G
};

// Register all custom elements
Object.entries(customElements).forEach(([name, BaseClass]) => {
  // Create the custom element class
  const CustomElement = class extends BaseClass {
    constructor() {
      super();
      this.addClass(name.toLowerCase());
    }
  };

  // Register the element with SVG.js
  SVG[name] = CustomElement;

  // Add factory method to SVG namespace
  const methodName = name.charAt(0).toLowerCase() + name.slice(1);
  SVG[methodName] = function() {
    return this.put(new CustomElement());
  };
});

// Add methods to SVG namespace
SVG.extend(SVG, {
  step: function() { return this.put(new SVG.Step()); },
  skip: function() { return this.put(new SVG.Skip()); },
  elevator: function() { return this.put(new SVG.Elevator()); },
  dumpTruck: function() { return this.put(new SVG.DumpTruck()); },
  scooptram: function() { return this.put(new SVG.Scooptram()); },
  ithDrill: function() { return this.put(new SVG.ITHDrill()); },
  groundSupport: function() { return this.put(new SVG.GroundSupport()); },
  jumboDrill: function() { return this.put(new SVG.JumboDrill()); },
  longholes: function() { return this.put(new SVG.Longholes()); },
  rockBreaker: function() { return this.put(new SVG.RockBreaker()); },
  jawCrusher: function() { return this.put(new SVG.JawCrusher()); },
  zimba: function() { return this.put(new SVG.Zimba()); }
});

export default SVG; 