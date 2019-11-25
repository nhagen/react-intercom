# `react-intercom`
A component to configure and enable Intercom in your react application. `react-intercom` is meant to support both the legacy and current versions of intercom messenger. If you run into issues, please submit an issue. Pull requests are also welcome!

## Installation
```bash
npm i react-intercom --save
```
or
```bash
yarn add react-intercom
```

## Usage
Inside of your application where you would be running Intercom, insert `ReactIntercom`:

```js
// Your App.js
import React from 'react';
import { ReactIntercom as Intercom, IntercomAPI } from 'react-intercom';

export default function ({
  user
}) {
  // ReactIntercom will automatically handle shutdown/boot when user_id or email changes
  const intercomData = user
    ? { user_id: user.id, email: user.email }
    : { last_step: 'checkout' };

  return (
    <div id="myApp">
      <Intercom
        app_id="xsdvb1w1"
        { ...intercomData }
      />
    </div>
  );
}
```

This loads the javascript required to boot Intercom, and will update the settings when the props change. For example, when the active user changes in the application, new props should be passed to reflect that, and Intercom will identify as the new user.

When `user_id` or `email` changes (or is removed), `ReactIntercom` will shutdown and reboot Intercom. Intercom will also shutdown when `ReactIntercom` is unmounted.

[**Props for `ReactIntercom` are always in snake_case to ensure compatibility with the official Intercom API.**](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects)

### Lazy Loading
`react-intercom` can be loaded lazily using dynamic imports or `React.lazy` API.

```js
// App.js

// ...

const ReactIntercom = React.lazy(() =>
  import('react-intercom').then(module => ({ default: module.ReactIntercom }))
);

function App ({ user }) {
  return (
    <div>
      { user && (
        <Suspense fallback={<Loading />}>
          <ReactIntercom
            app_id="your_app_id"
            user_id={ user.id }
            email={ user.email }
            name={ user.name } />
        </Suspense>
      )}
    </div>
  );
}
```

### `IntercomAPI`

`react-intercom` also exports a singleton for `window.Intercom` if you'd rather interact with a module than `window`. For example, where you'd like to log an event in your application:

```js
import { IntercomAPI } from 'react-intercom';
IntercomAPI('trackEvent', 'invited-friend');
```

This is, of course, equivalent to just calling `window.Intercom('trackEvent', 'invited-friend');`.

This API, whether accessed via `IntercomAPI` or `window.Intercom`, provides many ways to interact with your Intercom widget not supported by the JSX API provided by this module. [See Intercom's documentation for more information](https://developers.intercom.com/installing-intercom/docs/intercom-javascript)

This API has some types which this library provides basic type information for. [For more in depth information, see Intercom's documentation.](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects)

