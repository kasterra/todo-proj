import {
  BrowserRouter as Router,
  Routes as ReactRouterRoutes,
  Route,
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Login from './Login';
import UserDashBoard from './UserDashBoard';
import Signup from './Signup';
import TeamDashboard from './TeamDashboard';
import Todos from './Todos';

const Routes = () => {
  return (
    <Router>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="team" element={<TeamDashboard />} />
          <Route path="team/:teamId" element={<TeamDashboard />} />
          <Route path="user/:userId" element={<UserDashBoard />} />
        </Route>
        <Route path="/todo" element={<Todos />} />
      </ReactRouterRoutes>
    </Router>
  );
};

export default Routes;
