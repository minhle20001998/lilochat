import { useRoutes } from 'react-router';
import './App.css';
import routes from './route/routes';
import CensorProvider from './contexts/CensorContext';
import FilesProvider from './contexts/FilesContext';
function App() {
  const content = useRoutes(routes());

  return (
    <FilesProvider>
      <CensorProvider>
        <div className="App">
          {content}
        </div>
      </CensorProvider>
    </FilesProvider>
  );
}

export default App;
