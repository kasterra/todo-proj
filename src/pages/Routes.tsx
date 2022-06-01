import {
  BrowserRouter as Router,
  Routes as ReactRouterRoutes,
  Route,
} from "react-router-dom";
import Home from "./Home";
import Todos from "./Todos";

const Routes = () => {
  return (
    <Router>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todo"
          element={
              <Todos />
          }
        />
      </ReactRouterRoutes>
    </Router>
  );
};

export default Routes;
