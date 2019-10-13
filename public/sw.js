self.addEventListener("push", function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  console.log(event.data);
  const notification = JSON.parse(event.data.text())
  const title = notification.title;
  const options = {
    body: notification.body,
    icon: notification.icon,
    badge: notification.icon,
    image: notification.icon,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener("notificationclick", function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(clients.openWindow("https://frases-pwa.herokuapp.com"));
});
