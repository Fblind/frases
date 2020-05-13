const notifications = (function (_window, _navigator) {
  let _serviceWorker = null
  let _subscription = null

  function _getNotificationSwitch (_document) {
    return _document.querySelector('.switch-notification-checkbox');
  }

  function _setServiceWorker (value) {
    _serviceWorker = value
  }

  function _getServiceWorker () {
    return _serviceWorker
  }

  function _setSubscription (value) {
    _subscription = value
  }

  function _getSubscription () {
    return _subscription
  }

  function _registerServiceWorker (_window, _navigator) {
    return async () => {
      if ("serviceWorker" in _navigator && "PushManager" in _window) {
        try {
          _setServiceWorker(await _navigator.serviceWorker.register('sw.js'))
        } catch (error) {
          console.error("Service Worker Error", error);
        }
      } else {
        console.warn("Push messaging is not supported")
      }
    }
  }

  async function _isSubscribed() {
    _setSubscription(await _getServiceWorker().pushManager.getSubscription());
    return _getSubscription() !== null
  }

  function _setSubscribed (_document) {
    return () => {
      _getNotificationSwitch(_document).checked = true
    }
  }

  function _setUnSubscribed (_document) {
    return () => {
      _getNotificationSwitch(_document).checked = false
    }
  }

  async function _saveSubscription(subscription) {
    // const SERVER_URL = "https://frases-pwa.herokuapp.com/notifications/subscribe";
    const SERVER_URL = "http://localhost:8080/notifications/subscribe"
    const response = await fetch(SERVER_URL, {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(subscription)
    });
    return response.json();
  };


  function _subscribeUser(_window) {
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

    return async () => {
      const permission = await _window.Notification.requestPermission();
      if (permission === "granted") {
        const applicationServerKey = urlB64ToUint8Array("BGruMlB_05o4OARoRmBfYOjkixFyzXGDdCp3PBCpq3fl22pCnOI0V1uFUDt2b8YKiRP6siFwOEnzV3wOZIkeIfU");
        const subscription = await _getServiceWorker().pushManager.subscribe({userVisibleOnly: true, applicationServerKey})
        await _saveSubscription(subscription);
      }
    }
  }

  function _setEvents (_window, _document) {
    return () => {
      const subscribeUser = _subscribeUser(_window)
      const notificationSwitch = _getNotificationSwitch(_document)
      notificationSwitch.addEventListener('change', async function () {
        if (this.checked && !_getSubscription()) {
          console.log("isChecked")
          await subscribeUser()
        } else {
          console.log("isUnchecked")
          // _unsubscribeUser()
        }

      })
    }
  }

  return {
    getServiceWorker: _getServiceWorker,
    registerServiceWorker: _registerServiceWorker(_window, _navigator),
    isSubscribed: _isSubscribed,
    setSubscribed: _setSubscribed(_window.document),
    setUnSubscribed: _setUnSubscribed(_window.document),
    setEvents: _setEvents(_window, _window.document)
  }
})(window, navigator);

(async (notifications, _document) => {
  async function main () {
    await notifications.registerServiceWorker()
    if (notifications.getServiceWorker()) {
      const subscribed = await notifications.isSubscribed()
      if (subscribed) {
        notifications.setSubscribed()
      } else {
        notifications.setUnSubscribed()
      }
    }
  }

  notifications.setEvents();
  await main();
})(notifications);
