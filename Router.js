import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from "./page/LoginPage";
import ChooserPage from "./page/ChooserPage";

export const routerKeys = {
  page: {
    login: 'login',
    chooser: 'chooser'
  }
};

const RouterComponent = ({isLogin}) => (
  <Router>
    <Scene key="root">
      <Scene key={routerKeys.page.login} component={LoginPage} hideNavBar/>
      <Scene key={routerKeys.page.chooser} component={ChooserPage} hideNavBar/>
    </Scene>
  </Router>
);

export default RouterComponent;
