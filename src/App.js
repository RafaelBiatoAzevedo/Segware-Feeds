import './App.css';
import { Switch, Route } from 'react-router-dom'
import Feeds from './pages/Feeds';
import NoFoundPage from './components/NoFounPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Feeds }/>
      <Route exact path="/Segware-Feeds" component={ Feeds }/>
      <Route exact path="*" component={ NoFoundPage }/>
    </Switch>
  );
}

export default App;
