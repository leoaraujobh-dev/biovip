import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SentryErrorBoundary } from './components/common/SentryErrorBoundary';
import { initSentry, setSentryTags } from './utils/sentry';
import './index.css';

// Inicializa Sentry o mais cedo possível (antes do React renderizar)
initSentry();
setSentryTags({
  app: 'luxebio-studio',
  surface: 'web',
});

createRoot(document.getElementById('root')!).render(
  <SentryErrorBoundary
    fallbackTitle="Estúdio BioVip - Recuperação Automática"
    showDetails={import.meta.env.DEV}
  >
    <ErrorBoundary fallbackTitle="Estúdio BioVip - Recuperação Automática">
      <App />
    </ErrorBoundary>
  </SentryErrorBoundary>
);
