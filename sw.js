importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
const staticAssets = ['./', './style.css', './app.js', './today.png'];

workbox.precaching.precache(staticAssets);

workbox.routing.registerRoute('https://newsapi.org/(.*)', workbox.strategies.networkFirst());
