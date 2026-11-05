// Bump APP_VERSION for every release that changes the app shell.
const APP_VERSION='metro-pwa-v1.0.0';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
const RUNTIME='metro-runtime-v1.0.0';
self.addEventListener('install',event=>{event.waitUntil(caches.open(APP_VERSION).then(c=>c.addAll(APP_SHELL)))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('metro-')&&![APP_VERSION,RUNTIME].includes(key))await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.protocol!=='https:'&&url.protocol!=='http:')return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{try{const res=await fetch(request);if(res.ok){const cache=await caches.open(APP_VERSION);await cache.put('./index.html',res.clone())}return res}catch(e){return (await caches.match('./index.html'))||Response.error()}})());return;
 }
 if(url.origin===self.location.origin){
  event.respondWith((async()=>{const hit=await caches.match(request);if(hit)return hit;const res=await fetch(request);if(res.ok){const cache=await caches.open(RUNTIME);cache.put(request,res.clone())}return res})());return;
 }
 // Cross-origin Three.js, SheetJS and Google Fonts: offline after a successful cached response.
 if(['cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)){
  event.respondWith((async()=>{const cache=await caches.open(RUNTIME);const hit=await cache.match(request);if(hit)return hit;try{const res=await fetch(request);if(res.ok||res.type==='opaque')cache.put(request,res.clone());return res}catch(e){return hit||Response.error()}})());
 }
});
