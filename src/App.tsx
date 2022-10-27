import { Provider } from 'react-redux';
import { store } from './app-state/store';
import './App.css';
import { Main } from './pages/Main/Main';

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}

export default App;
