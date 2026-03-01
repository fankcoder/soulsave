self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // 这里可以添加缓存逻辑，目前保持默认通过
  e.respondWith(fetch(e.request));
});