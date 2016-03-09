import React, { Component, PropTypes } from 'react';
const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export let IntercomAPI = (canUseDOM && window.Intercom) || function() { console.warn('Intercom not initialized yet') };

export default class Intercom extends Component {
  static propTypes = {
    appID: PropTypes.string,
    app_id: PropTypes.string
  };

  static displayName = 'Intercom';

  constructor(props) {
    super(props);

    const appID = props.appID || props.app_id;

    if (!appID || !canUseDOM) {
      return;
    }

    if (!window.Intercom) {
      (function(w, d, id, s, x) {
        function i() {
            i.c(arguments);
        }
        i.q = [];
        i.c = function(args) {
            i.q.push(args);
        };
        w.Intercom = i;
        s = d.createElement('script');
        s.onload = function() { IntercomAPI = window.Intercom };
        s.async = 1;
        s.src = 'https://widget.intercom.io/widget/' + id;
        x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      })(window, document, appID);
    };

    window.intercomSettings = { ...props, app_id: appID };

    if (window.Intercom) {
      window.Intercom('boot', props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const appID = nextProps.appID || nextProps.app_id;

    if (!canUseDOM) return;

    window.intercomSettings = { ...nextProps, app_id: appID };
    window.Intercom('update');
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (!canUseDOM) return false;

    window.Intercom('shutdown');
  }

  render() {
    return false;
  }
}
