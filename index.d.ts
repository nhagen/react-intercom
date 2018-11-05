import { Component } from 'react';
import { IntercomAPI } from './src';

export interface IReactIntercomProps {
  appID: string;
  [key: string]: any;
}

export default class Intercom extends Component<IReactIntercomProps> {}

export declare const IntercomAPI;
