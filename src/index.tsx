import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import './Local/i18Next/i18n';
import { store } from './Store/store';
import 'react-toastify/dist/ReactToastify.css';
import './General/Styles/index.css';
import ReturnableProducts from './Pages/Returnble/ReturnableProducts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);


