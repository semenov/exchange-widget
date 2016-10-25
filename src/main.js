import { h, render, Component } from 'preact';
import ExchangeWidget from './components/ExchangeWidget';

const widget = {
  run: container => {
      render(<ExchangeWidget/>, container);
  }
};

window.ExchangeWidget = widget;
