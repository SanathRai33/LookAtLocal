import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/common/Loader';
import { routes } from './routes';
import { RouteSEO } from './components/SEO/SEO';

// Component to use routes
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <RouteSEO />
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;