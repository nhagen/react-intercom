import React from 'react';

export default class Intercom extends React.Component {
  static propTypes = {
    appID: React.PropTypes.string.isRequired
  }

  static displayName = 'Intercom'

  constructor(props) {
    super(props);

    window.intercomSettings = { app_id: props.appID };

    if (typeof window.intercom === 'function') {
      window.Intercom('boot', {
        app_id: props.appID
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // do stuff when user changes
  }
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (typeof window.Intercom === "function" || !this.props.intercomAppID) {
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
    })(window, document, this.props.intercomAppID);
  }

  render() {
    return false;
  }
}
