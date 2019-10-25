export default function(...args: [string, ...Array<any>]) {
  if (window.Intercom) {
    window.Intercom.apply(null, args);
  } else {
    console.warn('Intercom not initialized yet');
  }
}
