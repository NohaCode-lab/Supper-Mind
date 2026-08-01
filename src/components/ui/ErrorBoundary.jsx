import React from "react";
import { captureException } from "../../services/sentry";
import Button from "./Button";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    captureException(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 text-2xl">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Something unexpected occurred
          </h2>
          <p className="text-xs text-slate-500 max-w-md">
            Our engineering team has been notified via observability logging. Please refresh or try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
