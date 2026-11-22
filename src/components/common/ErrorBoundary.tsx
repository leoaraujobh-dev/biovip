import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { executeAndLog } from '../../utils/errorHandling';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    executeAndLog(() => {
      localStorage.removeItem('luxebio_editor_active_draft');
    }, 'clearActiveDraftOnErrorBoundaryReset');
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {this.props.fallbackTitle || 'Ops, ocorreu um erro de exibição'}
            </h2>
            <p className="text-xs text-neutral-400">
              Ocorreu uma inconsistência temporária de dados ao carregar a interface. Clique abaixo para reiniciar o estúdio em segurança.
            </p>
            {this.state.error?.message && (
              <pre className="text-[10px] text-red-400 bg-neutral-950 p-2.5 rounded-lg text-left overflow-auto max-h-28 border border-neutral-800 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recarregar Estúdio em Segurança</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
