# react-intercom
A compont to configure and enable Intercom in your react application

## Installation
```
npm i react-intercom --save-dev
```

## Usage
Inside of your application where you would be running Intercom, insert `Intercom`:
```
<Intercom appID="az33rewf" userID={ user.id } otherUserProp={ user.otherUserProp } />
```
This loads the javascript required to boot Intercom, and will update the settings when the props change. For example, when the active user changes in the application, new props should be passed to reflect that, and Intercom will be registering the new user. `react-intercom` also exports the singleton `window.Intercom` if you'd rather interact with a module than `window`. For example, where you'd like to log an event in your application:

```
import { IntercomAPI } from 'react-intercom';

...

  IntercomAPI('trackEvent', 'invited-friend');
```

This is, of course, equivalent to just calling `window.Intercom('trackEvent', 'invited-friend');` or even `Intercom('trackEvent', 'invited-friend');`.
