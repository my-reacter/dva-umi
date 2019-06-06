import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    ...((require('D:/dva-umi/src/dva.js').config || (() => ({})))()),
    ...(runtimeDva.config || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('D:/dva-umi/src/models/global.js').default) });
app.model({ namespace: 'example', ...(require('D:/dva-umi/src/pages/example/models/example.js').default) });
app.model({ namespace: 'example', ...(require('D:/dva-umi/src/pages/content/example/models/example.js').default) });
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
