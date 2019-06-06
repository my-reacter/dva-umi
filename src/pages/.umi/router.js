import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import history from '@tmp/history';


const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/example",
        "exact": true,
        "component": require('../example/index.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/content",
        "exact": false,
        "component": require('../content/_layout.js').default,
        "routes": [
          {
            "path": "/content/example",
            "exact": true,
            "component": require('../content/example/index.js').default
          },
          {
            "path": "/content",
            "exact": true,
            "component": require('../content/index.js').default
          },
          {
            "path": "/content/list",
            "exact": true,
            "component": require('../content/list.js').default
          },
          {
            "component": () => React.createElement(require('D:/dva-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "component": () => React.createElement(require('D:/dva-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/dva-umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper() {
  return (
<Router history={history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
