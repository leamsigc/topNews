importScripts('../node_modules/workbox-sw/build/workbox-sw.js');
const staticAssets = ['./', './style.css', './app.js', './today.png'];

const wb = new workbox();

wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());
