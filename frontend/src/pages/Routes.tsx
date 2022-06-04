import {
  BrowserRouter as Router,
  Routes as ReactRouterRoutes,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Todos from './Todos';

const Routes = () => {
  return (
    <Router>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todos />} />
      </ReactRouterRoutes>
    </Router>
  );
};

export default Routes;
