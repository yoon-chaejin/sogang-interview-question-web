import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from './pages';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/signin' component={Pages.SignIn}/>
        <Route exact path='/signup' component={Pages.SignUp}/>

        <RequireAuth>
          <Switch>
            <Route exact path='/mypage' component={Pages.MyPage}/>
            <Route exact path='/categories' component={Pages.Category}/>
            <Route exact path='/questions/:id' component={Pages.Question}/>
            <Route exact path='/questions' component={Pages.Questions}/>
            <Route exact path='/' component={Pages.Home}/>
          </Switch>
        </RequireAuth>
      </Switch>
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
