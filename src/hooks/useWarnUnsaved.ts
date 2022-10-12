let temp = '/dashboard';
export const useWarnUnsaved = () => {
  const message = 'The upload is not completed yet. Are you sure you want to leave?';
  // const routeChangeStart = (e: any) => {
  //   if (temp !== e) {
  //     if (!confirm(message)) {
  //       Router.events.emit('routeChangeError');
  //       // Router.replace(Router, Router.asPath);
  //       // tslint:disable-next-line: no-string-throw
  //       throw 'Route change was aborted';
  //     }
  //   }
  //   temp = e;
  // };

  const beforeUnload = (e: BeforeUnloadEvent) => {
    (e || window.event).returnValue = message;
    return message;
  };

  const completed = () => {
    window.removeEventListener('beforeunload', beforeUnload);
    // Router.events.off('routeChangeStart', routeChangeStart);
  };

  const started = () => {
    window.addEventListener('beforeunload', beforeUnload);
    // Router.events.on('routeChangeStart', routeChangeStart);
  };

  return [started, completed];
};
