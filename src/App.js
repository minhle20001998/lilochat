import { useRoutes } from 'react-router';
import './App.css';
import routes from './route/routes';
import CensorProvider from './contexts/CensorContext';
function App() {
  const content = useRoutes(routes());

  return (
    <CensorProvider>
      <div className="App">
        {content}
      </div>
    </CensorProvider>
  );
}

export default App;
