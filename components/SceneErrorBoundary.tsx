"use client";

import { Component, type PropsWithChildren } from "react";

type Props = PropsWithChildren<{ fallback: React.ReactNode }>;
type State = { hasError: boolean };

// Shared guard for every R3F canvas: if WebGL/3D fails for any reason, swap in
// the provided fallback instead of rendering a blank box.
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Surfaces transient WebGL failures instead of swallowing them silently.
    console.error("3D scene failed — showing fallback:", error);
  }

  render() {
    if (this.state.hasError) return <>{this.props.fallback}</>;
    return this.props.children;
  }
}
