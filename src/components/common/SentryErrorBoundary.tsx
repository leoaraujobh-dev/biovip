/**
 * Sentry Error Boundary para React 19
 * Captura erros de renderização e envia para Sentry com contexto
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { captureError, addBreadcrumb } from '../../utils/sentry';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackRender?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class SentryErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Adiciona breadcrumb antes de capturar
    addBreadcrumb('react.error_boundary', 'React Error Boundary caught error', {
      componentStack: errorInfo.componentStack,
      errorMessage: error.message,
      errorName: error.name,
    }, 'error');

    // Envia para Sentry com contexto rico
    captureError(error, 'ReactErrorBoundary', {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      // Contexto adicional pode vir de props
    });

    // Callback opcional
    this.props.onError?.(error, errorInfo);

    // Log local também
    console.error('[ErrorBoundary] Erro capturado:', error, errorInfo);
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, fallbackRender, showDetails = false, fallbackTitle } = this.props;

    if (hasError) {
      // Fallback customizado via render prop
      if (fallbackRender && error) {
        return fallbackRender(error, this.reset);
      }

      // Fallback padrão
      if (fallback) {
        return fallback;
      }

      // Fallback padrão integrado
      return (
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '12px',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
          }}
          role="alert"
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ margin: '0 0 12px', fontSize: '20px' }}>{fallbackTitle || 'Algo deu errado'}</h2>
          <p style={{ margin: '0 0 20px', color: '#aaa', fontSize: '14px' }}>
            Ocorreu um erro inesperado. Nossa equipe foi notificada automaticamente.
          </p>

          {showDetails && error && (
            <details style={{ textAlign: 'left', marginBottom: '20px' }}>
              <summary style={{ cursor: 'pointer', color: '#888', fontSize: '12px' }}>
                Detalhes técnicos
              </summary>
              <pre
                style={{
                  margin: '12px 0 0',
                  padding: '12px',
                  background: '#0d0d0d',
                  borderRadius: '8px',
                  fontSize: '11px',
                  overflow: 'auto',
                  maxHeight: '200px',
                  color: '#888',
                  textAlign: 'left',
                }}
              >
                {error.name}: {error.message}
                {error.stack && `\n\n${error.stack.split('\n').slice(0, 10).join('\n')}`}
              </pre>
            </details>
          )}

          <button
            onClick={this.reset}
            style={{
              padding: '10px 24px',
              background: '#fbbf24',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Tentar novamente
          </button>

          <p style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
            ID do erro: <code>{Sentry.lastEventId() || 'não disponível'}</code>
          </p>
        </div>
      );
    }

    return children;
  }
}

/**
 * HOC para wrap de componentes com Error Boundary
 */
export function withSentryErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
): React.FC<P> {
  return function WithErrorBoundary(props: P) {
    return (
      <SentryErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </SentryErrorBoundary>
    );
  };
}

export default SentryErrorBoundary;