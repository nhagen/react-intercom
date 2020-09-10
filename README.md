> ## This package is no longer maintained
> 
> ### This is an unofficial package, is not maintined by Intercom, and now should now be considered _deprecated_. I can not recommend using external dependencies to manage adding simple scripts to your page. [Please refer to official Intercom documentation for installation instructions.](https://www.intercom.com/help/en/articles/170-integrate-intercom-in-a-single-page-app)

Installing Intercom (and other similar third party scripts) is trivial without using a package like `react-intercom`. Using an unofficial dependency to do so may be convenient, but ultimately is not something I recommend. Unnecessary third party dependencies introduce unnecessary security risks and compatibility risk. If you'd like to maintain an internal version of this package, please fork this repo or use this package as a guide on how that can be done. Its easy!

# react-intercom
A component to configure and enable Intercom in your react application. `react-intercom` is meant to support both the legacy and current versions of intercom messenger. If you run into issues, please submit an issue. Pull requests are also welcome!

[Link to the full Intercom Javascript API](https://developers.intercom.com/installing-intercom/docs/intercom-javascript)


## Installation
```bash
npm i react-intercom --save
```

## Usage
Inside of your application where you would be running Intercom, insert `Intercom`:
```js
import React from 'react';
import Intercom from 'react-intercom';

export class App extends React.Component {

  render () {
    const { appUser } = this.props;
    
    const user = {
      user_id: appUser.id,
      email: appUser.email,
      name: appUser.name
    };

    return (
      <div className="app">
        <Intercom appID="az33rewf" { ...user } />
      </div>
    );
  }
}
```
This loads the javascript required to boot Intercom, and will update the settings when the props change. For example, when the active user changes in the application, new props should be passed to reflect that, and Intercom will be registering the new user. `react-intercom` also exports the singleton `window.Intercom` if you'd rather interact with a module than `window`. For example, where you'd like to log an event in your application:

```js
import { IntercomAPI } from 'react-intercom';
IntercomAPI('trackEvent', 'invited-friend');
```

This is, of course, equivalent to just calling `window.Intercom('trackEvent', 'invited-friend');` or even `Intercom('trackEvent', 'invited-friend');`.
