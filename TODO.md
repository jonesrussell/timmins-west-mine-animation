# Migration TODO

## 1. Remove Grunt and Migrate Tasks to Vite

- [x] Remove all Grunt-related dependencies from `package.json` (`grunt`, `grunt-*`, `time-grunt`, `load-grunt-tasks`, etc.)
- [x] Delete `Gruntfile.js`
- [x] Remove the `start` script from `package.json` that uses Grunt
- [x] For each Grunt task, migrate to the Vite equivalent:
    - [x] **Live server/reload**: Use `vite dev` (already set up)
    - [x] **CSS autoprefix/minify**: Install `autoprefixer` and `postcss` if needed, configure in `postcss.config.js`
    - [x] **JS concat/uglify**: Handled by Vite/rollup automatically
    - [x] **HTML minification**: Handled by Vite in production build
    - [ ] **Image optimization**: Install and configure `vite-plugin-imagemin`
    - [ ] **File copying**: Install and configure `vite-plugin-static-copy` for assets
    - [ ] **SVG minification**: Install and configure `vite-plugin-svgo`
    - [x] **Revisioning (cache busting)**: Handled by Vite (hashed filenames)
    - [x] **Dependency injection (wiredep)**: Use npm for dependencies, import in JS/HTML

## 2. Remove Bower and Migrate to npm

- [x] List all dependencies in `bower.json`
- [x] For each dependency, find the npm equivalent and install with `npm install <package> --save`
- [x] Update all HTML/JS references to use npm packages (import from `node_modules` or via Vite)
- [x] Delete `bower.json` and `bower_components/`

## 3. Update Project Structure

- [x] Move any static assets (images, fonts, etc.) to `app/` or a suitable directory
- [x] Update `vite.config.js` to use plugins for images, SVGs, and static copy as needed
- [x] Create or update `postcss.config.js` for CSS processing

## 4. Fix Current Errors

- [ ] Fix Modernizr integration:
    - [x] Remove requirejs dependency
    - [x] Install and configure modernizr via npm
    - [ ] Update modernizr imports to use ES modules
- [ ] Fix SVG.js integration:
    - [x] Update SVG.js imports to use latest version
    - [x] Fix SVG.extend not being a function error
    - [ ] Ensure SVG.js is properly initialized before extensions
- [ ] Fix SVGjsAnim class:
    - [x] Ensure SVGjsAnim is properly exported from svgjs-anim.js
    - [ ] Update all animation modules to properly import SVGjsAnim
    - [ ] Fix circular dependencies if any
- [ ] Fix static assets:
    - [ ] Move favicon.ico to public directory
    - [ ] Configure Vite to serve static assets correctly

## 5. Test and Clean Up

- [ ] Run `npm run dev` and verify the site works as expected
- [ ] Run `npm run build` and verify the production build
- [ ] Remove any unused files or configs

---

## Example Commands

Install Vite plugins:
```bash
npm install --save-dev vite-plugin-imagemin vite-plugin-static-copy vite-plugin-svgo autoprefixer postcss
```

Install core dependencies:
```bash
npm install @svgdotjs/svg.js modernizr classie eventbusjs
```

---

## Notes
- Refer to Vite documentation for plugin configuration: https://vitejs.dev/
- SVG.js documentation: https://svgjs.com/docs/3.0/
- Modernizr documentation: https://modernizr.com/docs
- Current focus: Fix SVGjsAnim class and animation modules to properly handle imports and exports
- Next steps:
  1. Update animation modules to use ES6 imports for SVGjsAnim
  2. Fix Modernizr ES module imports
  3. Configure static assets in Vite
  4. Test the application in development mode 