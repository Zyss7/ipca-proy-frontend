export const registerSw = async () => {
  // if ("serviceWorker" in navigator) {
  const reg = await navigator.serviceWorker.register('/sw.js');
  return subscribe(reg);
  // } else {
  //showNotAllowed("You can't send push notifications ☹️😢");
  // }
};

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  return outputArray.map((output, index) => rawData.charCodeAt(index));
}

const subscribe = async (reg) => {
  const subscription = await reg.pushManager.getSubscription();
  if (subscription) {
    return sendSubData(subscription);
  }

  const key =
    'BH2Qfo0zQTXbPIa6ImMTv2kNfFdbgq2gPPDUdG-olPis4Z4cU3rYNrBcdeogszrUtxTQei1ozUVGvPVD5xDC64Y';
  const options = {
    userVisibleOnly: true,
    ...(key && { applicationServerKey: urlB64ToUint8Array(key) }),
  };

  const sub = await reg.pushManager.subscribe(options);
  return sendSubData(sub);
};

const sendSubData = async (subscription) => {
  const browser = navigator.userAgent
    .match(/(firefox|msie|chrome|safari|trident)/gi)[0]
    .toLowerCase();

  const data = {
    status_type: 'subscribe',
    subscription: subscription.toJSON(),
    browser: browser,
    group: 'MLN',
  };

  return data;
};
