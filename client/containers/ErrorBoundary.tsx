import React, { Component, ErrorInfo } from 'react'
import { str } from "../lib";

interface IErrorBoundaryState {
    hasError: boolean
}

/**
 * Component that wraps our app that catches any runtime errors and prevents a hard crash
 *
 */
export default class ErrorBoundary extends Component<{}, IErrorBoundaryState > {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        const [{ children }, { hasError }] = [this.props, this.state];

        if (hasError) {
            // You can render any custom fallback UI
            return <h1>{str('pages.error.title')}</h1>;
        }

        return children;
    }
}