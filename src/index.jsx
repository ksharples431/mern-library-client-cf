import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import background from './images/bookshelfempty.png';

const App = () => {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Container>
        <MainView />
      </Container>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
