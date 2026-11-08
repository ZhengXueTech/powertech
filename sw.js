/* PowerTech 工具箱 離線快取
 * 策略：有網路時抓最新版並更新快取；沒網路時用快取 → 斷網也能開
 * 新增工具頁面時，把路徑加進 PRECACHE；大改版時把 VERSION 加 1
 */
const VERSION = 'pt-v1';
const PRECACHE = [
  './',
  './index.html',
  './controller/',
  './controller/index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // 網路優先（拿到最新版），失敗才用快取（離線）
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./controller/index.html')))
  );
});
