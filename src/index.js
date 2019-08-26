import React, { Component } from 'react';
import PropTypes from 'prop-types';
const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export const IntercomAPI = (...args) => {
  if (canUseDOM && window.Intercom) {
    window.Intercom.apply(null, args);
  } else {
    console.warn('Intercom not initialized yet');
  }
};

export default class Intercom extends Component {
  static propTypes = {
    appID: PropTypes.string.isRequired,
  };

  static displayName = 'Intercom';

  constructor(props) {
    super(props);

    const {
      appID,
      ...otherProps,
    } = props;

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
        s.async = 1;
        s.src = 'https://widget.intercom.io/widget/' + id;
        d.head.appendChild(s);
      })(window, document, appID);
    }

    window.intercomSettings = { ...otherProps, app_id: appID };

    if (window.Intercom) {
      window.Intercom('boot', otherProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    // Doing in next tick to immediately return false for the sCU
    setTimeout(this.reInit, 0, nextProps);

    return false;
  }

  componentWillUnmount() {
    if (!canUseDOM || !window.Intercom) return false;

    window.Intercom('shutdown');

    delete window.Intercom;
    delete window.intercomSettings;
  }

  reInit(nextProps) {
    const {
      appID,
      ...otherProps,
    } = nextProps;

    if (!canUseDOM) return;

    window.intercomSettings = { ...otherProps, app_id: appID };

    if (window.Intercom) {
      if (this.loggedIn(this.props) && !this.loggedIn(nextProps)) {
        // Shutdown and boot each time the user logs out to clear conversations
        window.Intercom('shutdown');
        window.Intercom('boot', otherProps);
      } else {
        window.Intercom('update', otherProps);
      }
    }
  }

  loggedIn(props) {
    return props.email || props.user_id;
  }

  render() {
    return false;
  }
}
