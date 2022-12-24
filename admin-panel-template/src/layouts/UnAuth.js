/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import routes from "routes.js";

function Unauth() {
  const location = useLocation();
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/unauth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  return (
    <>
      <div className="wrapper login-wrapper">
      <Switch>{getRoutes(routes)}</Switch>
      </div>
    </>
  );
}

export default Unauth;
