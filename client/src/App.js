import './App.css';
import Board from './components/Board';
import SubmitScore from './components/SubmitScore';
import Leaderboard from './components/Leaderboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/submit-score">
            <SubmitScore />
          </Route>
          <Route path="/">
            <Board />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

