import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Allocation from "./pages/Allocation";
import AllocationManage from "./pages/Allocation/AllocationManage";
import Courses from "./pages/Courses";
import Departament from "./pages/Departament";
import Home from "./pages/Home";
import Professor from "./pages/Professor";

const routes = [
  {
    path: "/",
    name: "Home",
    visible: false,
    component: Home,
  },
  {
    path: "/allocations",
    name: "Allocations",
    component: Allocation,
  },
  {
    path: "/allocations/:id",
    name: "Allocations",
    visible: false,
    component: AllocationManage,
  },
  {
    path: "/departament",
    name: "Departament",
    component: Departament,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/professor",
    name: "Professor",
    component: Professor,
  },
];

const Router = () => (
  <BrowserRouter>
    <Layout routes={routes}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            component={route.component}
            exact
            key={index}
            path={route.path}
          />
        ))}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
