import { useRoutes } from 'react-router';
import './App.css';
import routes from './route/routes';
function App() {
  const content = useRoutes(routes());

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
