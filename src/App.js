import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from './pages';

function App() {
  return (
    <div>
      <Route exact path='/signin' component={Pages.SignIn}/>
      <Route exact path='/signup' component={Pages.SignUp}/>

      <RequireAuth>
        <Switch>
          <Route exact path ='/category' component={Pages.Category}/>
          <Route exact path='/' component={Pages.Home}/>
        </Switch>
      </RequireAuth>
    </div>
  );
}

const RequireAuth = ({children}) => {
  if (localStorage.getItem('token')) {
    return children;
  }

  return <Redirect to='/signin' />
}

export default App;
