import React, { Component, PropTypes } from 'react';

export let IntercomAPI = window.Intercom || function() { console.warn('Intercome not initialized yet') };

export default class Intercom extends Component {
  static propTypes = {
    appID: PropTypes.string,
    app_id: PropTypes.string,
  }

  static displayName = 'Intercom'

  constructor(props) {
    super(props);

    const appID = props.appID || props.app_id;

    if (!appID) {
        return;
    }
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

    window.intercomSettings = { ...props.settings, app_id: appID };

    if (typeof window.Intercom === 'function') {
      window.Intercom('boot', props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const appID = nextProps.appID || nextProps.app_id;

    window.intercomSettings = { ...nextProps.settings, app_id: appID };
    window.Intercom('update');
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.Intercom('shutdown');
  }

  render() {
    return false;
  }
}
