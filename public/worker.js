self.addEventListener('push', e => {
  const data = e.data.json();
  console.error(data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://probox.app/img/logo-72x72.png'
  });
});
