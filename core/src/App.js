
import {Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import QuizSelect from './components/QuizSelect'
import RandomQuiz from './components/RandomQuiz'


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={QuizSelect} exact />
          <Route path="/r/:topic" component={RandomQuiz} exact />
        </Switch>
    </Router>
  );
}

export default App
