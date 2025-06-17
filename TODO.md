# Migration TODO

## 1. Remove Grunt and Migrate Tasks to Vite

- [ ] Remove all Grunt-related dependencies from `package.json` (`grunt`, `grunt-*`, `time-grunt`, `load-grunt-tasks`, etc.)
- [ ] Delete `Gruntfile.js`
- [ ] Remove the `start` script from `package.json` that uses Grunt
- [ ] For each Grunt task, migrate to the Vite equivalent:
    - [ ] **Live server/reload**: Use `vite dev` (already set up)
    - [ ] **CSS autoprefix/minify**: Install `autoprefixer` and `postcss` if needed, configure in `postcss.config.js`
    - [ ] **JS concat/uglify**: Handled by Vite/rollup automatically
    - [ ] **HTML minification**: Handled by Vite in production build
    - [ ] **Image optimization**: Install and configure `vite-plugin-imagemin`
    - [ ] **File copying**: Install and configure `vite-plugin-static-copy` for assets
    - [ ] **SVG minification**: Install and configure `vite-plugin-svgo`
    - [ ] **Revisioning (cache busting)**: Handled by Vite (hashed filenames)
    - [ ] **Dependency injection (wiredep)**: Use npm for dependencies, import in JS/HTML

## 2. Remove Bower and Migrate to npm

- [ ] List all dependencies in `bower.json`
- [ ] For each dependency, find the npm equivalent and install with `npm install <package> --save`
- [ ] Update all HTML/JS references to use npm packages (import from `node_modules` or via Vite)
- [ ] Delete `bower.json` and `bower_components/`

## 3. Update Project Structure

- [ ] Move any static assets (images, fonts, etc.) to `app/` or a suitable directory
- [ ] Update `vite.config.js` to use plugins for images, SVGs, and static copy as needed
- [ ] Create or update `postcss.config.js` for CSS processing

## 4. Test and Clean Up

- [ ] Run `npm run dev` and verify the site works as expected
- [ ] Run `npm run build` and verify the production build
- [ ] Remove any unused files or configs

---

## Example Commands

Install Vite plugins:
```bash
npm install --save-dev vite-plugin-imagemin vite-plugin-static-copy vite-plugin-svgo autoprefixer postcss
```

---

## Notes
- Refer to Vite documentation for plugin configuration: https://vitejs.dev/
- If you need help with a specific migration step, add a note below. 