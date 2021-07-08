import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={Store}>
          <Main />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
