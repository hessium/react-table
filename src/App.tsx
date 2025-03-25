import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from './store/store';
import { AppRouter } from './containers/app-router/app-router.tsx';



export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      store.dispatch({ type: 'auth/loginSuccess', payload: token });
    }
  }, []);

  return (
      <Provider store={store}>
            <main>
                <CssBaseline />
                <AppRouter />
            </main>
      </Provider>
  );
}