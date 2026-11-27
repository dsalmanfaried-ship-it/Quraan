// غيّر رقم الإصدار عند نشر تحديث كبير ليُمسح الكاش القديم
const V = "tilawati-v1";
const SHELL = ["./", "index.html", "styles.css", "app.js", "manifest.webmanifest",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "data/quran-uthmani.txt"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// ملفات التطبيق والخطوط: نعرض من الكاش فورًا ونحدّثه في الخلفية
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET") return;
  if (u.origin !== location.origin && !/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)) return;
  e.respondWith(caches.open(V).then(c => c.match(r).then(hit => {
    const net = fetch(r).then(x => { if (x.ok || x.type === "opaque") c.put(r, x.clone()); return x; }).catch(() => hit);
    return hit || net;
  })));
});
