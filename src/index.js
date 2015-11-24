import React from 'react';

export default class Intercom extends React.Component {
  static propTypes = {
    appID: React.PropTypes.string.isRequired
  }

  static displayName = 'Intercom'

  constructor(props) {
    super(props);

    if (typeof window.Intercom === "function" || !props.appID) {
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
        s.async = 1;
        s.src = 'https://widget.intercom.io/widget/' + id;
        x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })(window, document, props.appID);

    window.intercomSettings = props;

    if (typeof window.intercom === 'function') {
      window.Intercom('boot', {
        app_id: props.appID
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    window.intercomSettings = nextProps;
    window.Intercom('update');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return false;
  }
}
