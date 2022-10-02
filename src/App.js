import './App.scss';

import LoginForm from './components/login/LoginForm';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={LoginForm} />
    </BrowserRouter>
  );
}

export default App;
