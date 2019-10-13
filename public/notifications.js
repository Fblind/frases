function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const swReg = await navigator.serviceWorker.register("sw.js")
      return swReg;
    } catch (error) {
      console.error("Service Worker Error", error);
      return null;
    }
  }
  console.warn("Push messaging is not supported");
  return null;
}

async function requestNotificationPermission() {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  return permission;
}

async function isSubscribedToPushNotification(swRegistration) {
  const subscription = await swRegistration.pushManager.getSubscription();
  return !(subscription === null);
}

async function saveSubscription(subscription) {
  const SERVER_URL = "https://frases-pwa.herokuapp.com/notifications/subscribe";
  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(subscription)
  });
  return response.json();
};

async function subscribeUser(swRegistration, applicationServerPublicKey) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  const subscription = await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })

  const response = await saveSubscription(subscription);
  return true;
}

async function main() {
  const sw = await registerServiceWorker();
  if (!sw) {
    return;
  }
  let subscribed = await isSubscribedToPushNotification(sw);
  if (!subscribed) {
    subscribeListener(sw);
  } else {
    hideNotificationQuestion();
  }
  // const permission = await requestNotificationPermission();
  // if (permission === "granted") {
  //   const applicationServerPublicKey = "BGruMlB_05o4OARoRmBfYOjkixFyzXGDdCp3PBCpq3fl22pCnOI0V1uFUDt2b8YKiRP6siFwOEnzV3wOZIkeIfU";
  //   let subscribed = await isSubscribedToPushNotification(sw);
  //   console.log("subscribed: ", subscribed);
  //   // showLocalNotification("This is title", "this is the message", sw);
  //   if (!subscribed) {
  //     subscribed = subscribeUser(sw, applicationServerPublicKey);
  //   }
  // }
}

main();

function subscribeListener(sw) {
  const subscribeBtn = document.querySelector(".subscribe");
  subscribeBtn.addEventListener("click", async () => {
    return await subscribe(sw);
  });
}

async function subscribe(sw) {
  const permission = await requestNotificationPermission();
  if (permission === "granted") {
    const applicationServerPublicKey = "BGruMlB_05o4OARoRmBfYOjkixFyzXGDdCp3PBCpq3fl22pCnOI0V1uFUDt2b8YKiRP6siFwOEnzV3wOZIkeIfU";
    let subscribed = await isSubscribedToPushNotification(sw);
    if (!subscribed) {
      subscribed = subscribeUser(sw, applicationServerPublicKey);
      hideNotificationQuestion();
    }
  }
}

function hideNotificationQuestion() {
  const subscribeBtn = document.querySelector(".subscribe");
  subscribeBtn.style.display = "none";
}
