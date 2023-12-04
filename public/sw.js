
const broadcast = new BroadcastChannel('channel');

self.addEventListener('push', async event => {
  const data = event.data.json();
  broadcast.postMessage(data);

  /* self.registration.showNotification(data.title, {
      icon: 'https://probox.app/favicon.ico',
      body: data.msg,
  }); */

});

// RECEBER MSG
/* broadcast.postMessage("OII")
 broadcast.onmessage = (pix) => {
  //broadcast.postMessage(pix);
}; */





