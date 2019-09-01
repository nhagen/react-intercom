export default function(method: string, ...args: Array<any>) {
  if (window.Intercom) {
    window.Intercom.apply(null, [method, args]);
  } else {
    console.warn('Intercom not initialized yet');
  }
}
